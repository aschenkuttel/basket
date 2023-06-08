import Card from "@/components/Card"
import {BasketContext} from "@/components/Context"
import {useContext} from "react"
import {ButtonLink} from "./Button"
import Image from "next/image"


export default function Display({children}) {

    const {baskets, assets} = useContext(BasketContext)

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {baskets.map((basket, index) => (
                <Card key={`card_${index}`} title={basket.title}>
                    <p className="flex-1">{basket.description}</p>

                    <div className="mt-4">
                        <p className="font-medium text-gray-700">
                            Owned / Total:
                        </p>
                        <p className="text-yellow-500">{basket.collected}$/{basket.target}$</p>
                    </div>

                    <div className="flex flex-col justify-center gap-y-5">
                        <div className="flex flex-col mt-4 -space-x-0.5 gap-1">
                            <dt className="sr-only">Assets</dt>
                            <p className="font-medium text-gray-700">
                                Assets:
                            </p>
                            <div className="flex gap-1">
                            {assets.map((asset, index) => (
                                <Image key={asset.id} width={24} height={24}
                                       className="h-5 w-5 rounded-full bg-gray-50 ring-2 ring-white"
                                       src={asset.iconUrl}
                                       alt={asset.name}
                                />
                            ))}
                            </div>
                        </div>

                        <ButtonLink to={`/basket/${basket.id}`}>
                            See details!
                        </ButtonLink>
                    </div>


                </Card>
            ))}
        </div>
    )
}