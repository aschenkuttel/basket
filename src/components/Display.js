import Card from "@/components/Card"
import { BasketContext } from "@/components/Context"
import {useState, useContext } from "react"

export default function Display({children}) {

    const {baskets} = useContext(BasketContext)

    

    
        console.log(baskets.length)


        baskets.forEach(basket => {
            console.log(basket)
        });



    
    

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {baskets.map((basket, index) => (
                <Card key={`card_${index}`} title={basket.title}>

                    

                    {basket.holders[0]}
                    {basket.holders[1]}
                </Card>
            ))}
        </div>
    )
}