import Card from "@/components/Card"
import {BasketContext} from "@/components/Context"
import {useContext} from "react"
import { ButtonLink } from "./Button"


export default function Display({children}) {

    const {baskets, assets} = useContext(BasketContext)

    baskets.forEach(basket => {
        console.log(basket)
    })

    assets.forEach(asset => {
        console.log(asset)
    })

    

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {baskets.map((basket, index) => (
                <Card key={`card_${index}`} title={basket.title}>
                    <ul>
                        <li>
                            <p>Description: {basket.description}</p>
                        </li>
                        <li>
                            <p>Target: {basket.collected}$/{basket.target}$</p>
                        </li>
                        
                        <div className="flex -space-x-0.5 gap-1">
                            <dt className="sr-only">Assets</dt>
                                <p>Assets: </p>
                                {assets.map((asset, index) => (
                                    <dd className = 'flex flex-row' key={asset.address}>
                                        
                                        <img
                                            className="h-5 w-5 rounded-full bg-gray-50 ring-2 ring-white"
                                            src={asset.iconUrl}
                                            alt={asset.name}
                                        />
                                    </dd>
                            ))}
            </div>
                    </ul>                    
                    <ButtonLink to={`/basket/${basket.id}`}>
                        See details!
                    </ButtonLink>
                </Card>
            ))}
        </div>
    )
}