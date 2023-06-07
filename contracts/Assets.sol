// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma abicoder v2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

struct Asset {
    address _address;
    address _poolAddress;
    address _oracleAddress;
    uint decimals;
    bool isZero;
}

interface IAssets {
    function isSupported(address) external view returns(bool);
    function getData(address) external view returns (Asset memory);
    function getLatestPrice(address) external view returns(uint);
}

contract Assets is Ownable {
    // temporary solution for mvp / allowing multihop in future
    address private _pairedAddress = 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd; // wbnb

    mapping(address => Asset) private _assets;

    constructor() {}

    function isSupported(address assetAddress) public view returns (bool) {
        return _assets[assetAddress]._address != address(0);
    }

    function getData(address assetAddress) external view returns (Asset memory) {
        return _assets[assetAddress];
    }

    function getLatestPrice(address assetAddress) external view returns (uint) {
        require(isSupported(assetAddress), "asset is not supported");

        (
        /* uint80 roundID */,
        int answer,
        /*uint startedAt*/,
        /*uint timeStamp*/,
        /*uint80 answeredInRound*/
        ) = AggregatorV3Interface(_assets[assetAddress]._oracleAddress).latestRoundData();
        return uint(answer);
    }

    function _unwrapPool(address poolAddress) internal view returns (address, bool) {
        IUniswapV3Pool pool = IUniswapV3Pool(poolAddress);

        address token0 = pool.token0();
        address token1 = pool.token1();

        if (token0 == _pairedAddress) {
            return (token1, false);
        } else if (token1 == _pairedAddress) {
            return (token0, true);
        } else revert("invalid paired liquidity asset");
    }

    function support(address poolAddress, address oracleAddress) external onlyOwner {
        (address assetAddress, bool isZero) = _unwrapPool(poolAddress);
        require(!isSupported(assetAddress), "asset is already supported");

        _assets[assetAddress] = Asset(
            assetAddress,
            poolAddress,
            oracleAddress,
            ERC20(assetAddress).decimals(),
            isZero
        );
    }

    function unSupport(address poolAddress) external onlyOwner {
        (address assetAddress,) = _unwrapPool(poolAddress);
        require(isSupported(assetAddress), "asset is not supported");

        delete _assets[assetAddress];
    }

}