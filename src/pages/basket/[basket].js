import {BasketContext} from "@/components/Context"
import {useContext, useState, useEffect} from "react"
import {useRouter} from 'next/router'
import Image from "next/image"
import {Button} from '@/components/Button'
import {useContractWrite} from "wagmi"
import {parseGwei} from "viem";
import {basketABI} from "@/lib/ABI";


export default function Basket() {
    const {baskets, assets, isLoading} = useContext(BasketContext)
    const [basket, setBasket] = useState(null)
    const [basketAssets, setBasketAssets] = useState([])
    const router = useRouter()

    const buyData = useContractWrite({
        address: '0xA9D65a198AD79DD238bf522e71d5dDeFEdaaAA33',
        abi: basketABI,
        functionName: 'buyPending',
        value: parseGwei("1000")
    })

    const sellData = useContractWrite({
        address: '0xA9D65a198AD79DD238bf522e71d5dDeFEdaaAA33',
        abi: basketABI,
        functionName: 'sellPending'
    })

    useEffect(() => {
        (async () => {
            const basketObject = baskets.find(basket => basket.id === router.query.basket)
            setBasket(basketObject || null)

            if (basketObject !== null) {
                const _basketAssets = assets.filter(asset => basketObject.assets.includes(asset.id))
                console.log(_basketAssets)
                setBasketAssets(_basketAssets)
            }
        })()
    }, [isLoading])

    if (isLoading) {
        return <div>Loading</div>
    } else if (basket === null) {
        return <div>No Basket with that ID</div>
    } else {
        return (
            <div className="flex-1">
                <div
                    class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                    <div>
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trust
                            Information</h2>
                        <dl class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            <div class="border-t border-gray-200 pt-4">
                                <dt class="font-medium text-gray-900">Name</dt>
                                <dd class="mt-2 text-sm text-gray-500">{basket.title}</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4">
                                <dt class="font-medium text-gray-900">Details</dt>
                                <dd class="mt-2 text-sm text-gray-500">{basket.description}</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4">
                                <dt class="font-medium text-gray-900">Assets</dt>
                                <dd class="mt-2 text-sm text-gray-500 flex gap-2">{
                                    basketAssets.map((asset,) => (
                                        <Image key={asset.id} src={asset.iconUrl} alt={asset.name} width={24}
                                               height={24}/>
                                    ))
                                }</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4">
                                <dt class="font-medium text-gray-900">Amount Collected / Target Amount</dt>
                                <dd class="mt-2 text-sm text-yellow-500">{basket.collected}$/{basket.target}$</dd>
                            </div>
                        </dl>
                    </div>

                    <div class="gap-4 sm:gap-6 lg:gap-8 h-128 w-128">
                        <Image width={480} height={256}
                            src="https://cdn2.etrade.net/1/19010916210.0/aempros/content/dam/etrade/retail/en_US/images/knowledge/library/stocks/sp500-daily-line-chart.png"
                            alt="BTC"/>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Button className="flex-1" onClick={buyData.write}>
                                Buy
                            </Button>
                            <Button className="flex-1" onClick={sellData.write}>
                                Cancel Buy
                            </Button>
                        </div>

                        <div className="flex gap-4">
                            <Button className="flex-1" disabled>
                                Sell
                            </Button>
                            <Button className="flex-1" disabled>
                                Cancel Sell
                            </Button>
                        </div>

                        <div className="flex gap-4">
                            <Button className="flex-1" disabled>
                                Instant Buy
                            </Button>
                            <Button className="flex-1" disabled>
                                Instant Sell
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}