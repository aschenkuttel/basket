import { PaperClipIcon } from '@heroicons/react/20/solid'
import {BasketContext} from "@/components/Context"
import {useContext, useState, useEffect} from "react"
import { useRouter } from 'next/router';
import { CardLineChart } from "@/components/CardLineChart";
import { Button } from '@/components/Button';


export default function Basket() {

  const {baskets} = useContext(BasketContext)
  const router = useRouter();
  const basketId = router.query;
  console.log(basketId);

  

  /* const [receivedBasket, setBasket] = useState(null);

  useEffect(() => {
    (async () => {
        await baskets.getBasket(basketId)
        const basket = await db.getBasket(basketId)
            setBasket(basket)   
    })()
}, [])
*/

  return (
  <div className="flex items-center">

    <div className="bg-white">
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trust Information</h2>
          <dl class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">Name</dt>
              <dd class="mt-2 text-sm text-gray-500">BigTc</dd>
            </div>
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">Details</dt>
              <dd class="mt-2 text-sm text-gray-500">Good times, good shares</dd>
            </div>
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">Assets</dt>
              <dd class="mt-2 text-sm text-gray-500">BTC,ETH</dd>
            </div>
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">Amount Colected / Target Amount</dt>
              <dd class="mt-2 text-sm text-gray-500">200$/500$</dd>
            </div>
          </dl>
        </div>

        <div class="gap-4 sm:gap-6 lg:gap-8 h-32 w-32">
          <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/black/btc.svg" alt="BTC" />
        </div>

        <div class="flex flex-row items-center gap-4">
        <Button onClick={async () => {
          // const transactionID = await buyIn()
        }} 
        className="bg-green-500"> Buy-in</Button>
        <Button onClick={async () => {
          // const transactionID = await refund()
        }} className="bg-red-500">Refund</Button>
        <Button onClick={async () => {
          // const transactionID = await sell()
        }} className="bg-red-600">Sell</Button>
        </div>
       </div>
    </div> 
  </div>
    
  )
}