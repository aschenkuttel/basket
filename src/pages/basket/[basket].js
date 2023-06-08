import {PaperClipIcon} from '@heroicons/react/20/solid'
import {BasketContext} from "@/components/Context"
import {useContext, useState, useEffect} from "react"
import {useRouter} from 'next/router';
// import { CardLineChart } from "@/components/CardLineChart";
import {Button} from '@/components/Button';


export default function Basket() {
    const {baskets, assets, isLoading} = useContext(BasketContext)
    const [loading, setLoading] = useState(true)
    const [basket, setBasket] = useState(null)
    const [basketAssets, setBasketAssets] = useState([])
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const basketObject = baskets.find(basket => basket.id === router.query.basket)
            setBasket(basketObject || null)

            if (basketObject !== null) {
                const _basketAssets = assets.filter(asset => basketObject.assets.includes(asset.id))
                console.log(_basketAssets)
                setBasketAssets(_basketAssets)
            }

            setLoading(false)
        })()
    }, [isLoading])

    if (loading) {
        return <div>Loading</div>
    } else if (basket === null) {
        return <div>No Basket with that ID</div>
    } else {
        return (
            <div className="flex items-center">

                <div className="bg-white">
                    <div
                        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
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
                                    <dd class="mt-2 text-sm text-gray-500 flex flex-row -space-x-0.5 gap-1">{
                                        basketAssets.map((asset, index) => (
                                            <dd className='h-5 w-5' key={asset.address}>
                                                <img src={asset.iconUrl} alt={asset.name}/>
                                            </dd>
                                        ))
                                    }</dd>
                                </div>
                                <div class="border-t border-gray-200 pt-4">
                                    <dt class="font-medium text-gray-900">Amount Colected / Target Amount</dt>
                                    <dd class="mt-2 text-sm text-yellow-500">{basket.collected}$/{basket.target}$</dd>
                                </div>
                            </dl>
                        </div>

                        <div class="gap-4 sm:gap-6 lg:gap-8 h-128 w-128">
                            <img
                                src="https://cdn2.etrade.net/1/19010916210.0/aempros/content/dam/etrade/retail/en_US/images/knowledge/library/stocks/sp500-daily-line-chart.png"
                                alt="BTC"/>
                        </div>

                        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            <Button onClick={async () => {
                                // const transactionID = await buyIn()
                            }}
                                    className="bg-green-500 hover:bg-green-400">Buy</Button>
                            <Button onClick={async () => {
                                // const transactionID = await instantBuy()
                            }} className="bg-green-600 hover:bg-green-400">Instant Buy</Button>
                            <Button onClick={async () => {
                                // const transactionID = await cancelBuy()
                            }} className="bg-yellow-500 hover:bg-yellow-400">Cancel Buy</Button>
                            <Button onClick={async () => {
                                // const transactionID = await sell()
                            }} className="bg-red-600 hover:bg-red-400">Sell</Button>
                            <Button onClick={async () => {
                                // const transactionID = await cancelSell()
                            }} className="bg-red-600 hover:bg-red-400">Cancel Sell</Button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}