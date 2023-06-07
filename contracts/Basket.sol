// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma abicoder v2;

import './Assets.sol';

interface IWBNB {
    function balanceOf(address) external returns(uint);
    function deposit() external payable;
    function transfer(address to, uint value) external returns (bool);
    function withdraw(uint) external;
}

contract Basket is ERC20 {
    address BNB = 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd;
    IAssets private assets;
    uint public THRESHOLD;

    struct Amount {
        address _address;
        uint amount;
    }

    struct PendingPayment {
        address buyer;
        uint amount;
    }

    struct PendingCashout {
        address seller;
        uint amount;
    }

    mapping(address => uint) amountsIndex;
    Amount[] public amounts;

    PendingPayment[] private _pendingBuy;
    mapping(address => uint) _pendingBuyIndex;
    uint private _totalPendingBuyBalance;

    PendingCashout[] private _pendingSell;
    mapping(address => uint) _pendingSellIndex;
    uint private _totalPendingSellBalance;

    /*
    * @dev Indexes are generally stored shifted by one
    * @dev TODO: gas optimization
    */

    constructor(
        string memory name_,
        string memory symbol_,
        address[] memory desiredAssets_,
        uint[] memory desiredAmounts_,
        address assetsAddress,
        uint threshold_
    ) ERC20(name_, symbol_) {
        require(
            desiredAssets_.length == desiredAmounts_.length,
            "each address needs to have its corresponding amount"
        );

        for (uint i; i < desiredAssets_.length; i++) {
            address address_ = desiredAssets_[i];
            uint amount_ = desiredAmounts_[i];
            require(assets.isSupported(address_), "asset is not supported");
            require(amount_ > 0, "amount needs to be more than 0");

            amounts.push(Amount(
                address_,
                desiredAmounts_[i]
            ));

            amountsIndex[address_] = amounts.length;
        }

        THRESHOLD = threshold_;
        assets = IAssets(assetsAddress);
    }

    function usableBalanceOf(address owner) public view returns(uint) {
        uint index = _pendingSellIndex[owner];

        if (index > 0) {
            return balanceOf(owner) - _pendingSell[index - 1].amount;
        } else {
            return balanceOf(owner);
        }
    }

    function getPrice() public view returns (uint) {
        uint sharePrice = 0;
        for (uint i; i < amounts.length; i++) {
            uint price = assets.getLatestPrice(amounts[i]._address);
            sharePrice += amounts[i].amount * price;
        }

        return sharePrice;
    }

    function buyPending() external payable {
        require(msg.value > 0, "value needs to be greater than zero");
        uint index = _pendingBuyIndex[msg.sender];

        if (index == 0) {
            _pendingBuy.push(PendingPayment(
                msg.sender,
                msg.value
            ));
            _pendingBuyIndex[msg.sender] = _pendingBuy.length;
        } else {
            _pendingBuy[index].amount += msg.value;
        }

        _totalPendingBuyBalance += msg.value;

        // temporary in mvp, will be automated in prod.
        if (_totalPendingBuyBalance > THRESHOLD) {
            _buy();
        }
    }

    function sellPending() external {
        uint index = _pendingBuyIndex[msg.sender];
        require(index > 0, "no pending balance");
        uint realIndex = index - 1;

        uint pendingBalance = _pendingBuy[realIndex].amount;
        uint lastIndex = _pendingBuy.length - 1;

        if (realIndex != lastIndex) {
            _pendingBuy[realIndex] = _pendingBuy[lastIndex];
            _pendingBuyIndex[_pendingBuy[realIndex].buyer] = realIndex;
        }

        delete _pendingBuy[lastIndex];
        delete _pendingBuyIndex[msg.sender];

        payable(msg.sender).transfer(pendingBalance);
        _totalPendingBuyBalance -= pendingBalance;
    }

    function sell(uint amount) external {
        require(usableBalanceOf(msg.sender) >= amount, "amount exceeds balance");

        uint index = _pendingSellIndex[msg.sender];

        if (index == 0) {
            _pendingSell.push(PendingCashout(
                msg.sender,
                amount
            ));

            _pendingSellIndex[msg.sender] = _pendingSell.length;
        } else {
            uint realIndex = index - 1;
            _pendingSell[realIndex].amount += amount;
        }
    }

    function instantSell(uint shareAmount) external {
        require(shareAmount > 0, "amount needs to be greater than zero");
        require(usableBalanceOf(msg.sender) >= shareAmount, "insufficient balance");

        for (uint i; i < amounts.length; i++) {
            IUniswapV3Pool(amounts[i]._address).swap(
                address(this),
                assets.getData(amounts[i]._address).isZero, // true = token0 in and token1 out
                int(shareAmount * amounts[i].amount / (10 ** 18)),
                0,
                ""
            );
        }

        uint contractWrappedBalance = IWBNB(BNB).balanceOf(address(this));
        IWBNB(BNB).withdraw(contractWrappedBalance);
        uint contractBalance = address(this).balance;

        _burn(msg.sender, shareAmount);
        payable(msg.sender).transfer(contractBalance);
    }

    function instantBuy() external payable {
        require(msg.value > 0, "amount needs to be greater than zero");
        IWBNB(BNB).deposit{value: msg.value}();
        uint balance = IWBNB(BNB).balanceOf(address(this));
        uint sharePrice = getPrice();
        uint bnbPrice = assets.getLatestPrice(BNB);
        // 18 decimal number of shares we're able to buy
        uint possibleShares = (balance * bnbPrice) / sharePrice;

        for (uint i; i < amounts.length; i++) {
            IUniswapV3Pool(amounts[i]._address).swap(
                address(this),
                !assets.getData(amounts[i]._address).isZero, // true = token0 in and token1 out
                int(possibleShares * amounts[i].amount / (10 ** 18)),
                0,
                ""
            );
        }

        _mint(msg.sender, possibleShares);
    }

    function _buy() internal {
        IWBNB(BNB).deposit{value: address(this).balance}();
        uint balance = IWBNB(BNB).balanceOf(address(this));

        uint sharePrice = getPrice();
        uint bnbPrice = assets.getLatestPrice(BNB);
        // 18 decimal number of shares we're able to buy
        uint possibleShares = (balance * bnbPrice) / sharePrice;

        for (uint i; i < amounts.length; i++) {
            IUniswapV3Pool(amounts[i]._address).swap(
                address(this),
                !assets.getData(amounts[i]._address).isZero, // true = token0 in and token1 out
                int(possibleShares * amounts[i].amount / (10 ** 18)),
                0,
                ""
            );
        }

        for (uint i; i < _pendingBuy.length; i++) {
            address buyer = _pendingBuy[i].buyer;
            uint amountPayed = _pendingBuy[i].amount;

            uint partialShare = possibleShares * balance / amountPayed;
            _mint(buyer, partialShare);

            delete _pendingBuyIndex[buyer];
        }

        delete _pendingBuy;
    }

    function _sell() internal {
        for (uint i; i < amounts.length; i++) {
            IUniswapV3Pool(amounts[i]._address).swap(
                address(this),
                assets.getData(amounts[i]._address).isZero, // true = token0 in and token1 out
                int(_totalPendingSellBalance * amounts[i].amount / (10 ** 18)),
                0,
                ""
            );
        }

        uint contractWrappedBalance = IWBNB(BNB).balanceOf(address(this));
        IWBNB(BNB).withdraw(contractWrappedBalance);
        uint contractBalance = address(this).balance;

        for (uint i; i < _pendingSell.length; i++) {
            address seller = _pendingSell[i].seller;
            uint amount = _pendingSell[i].amount;
            uint cashoutAmount = amount * contractBalance / _totalPendingSellBalance;

            _pendingSell[i].amount = 0;
            payable(seller).transfer(cashoutAmount);
            _burn(seller, cashoutAmount);

            delete _pendingSellIndex[seller];
        }

        delete _pendingSell;
    }

    // pre transfer hook checking if {from} has enough amount after subtracting pending sells
    function _beforeTokenTransfer(address from, address, uint256 amount) internal virtual override {
        require(usableBalanceOf(from) >= amount);
    }
}