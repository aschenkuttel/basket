import Image from 'next/image'
import {Button,ButtonLink} from '../components/Button'
import {BookOpenIcon} from '@heroicons/react/24/outline'

export default function Home() {
    return (
        <div className="mx-auto max-w-2xl justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-slate-300 sm:text-6xl">
                        Welcome to <span className='text-cyan-600'>Basket</span>
                </h1>
            </div>

            <div className="text-center">
                <h1 className="mt-20 text-2xl font-bold tracking-tight text-slate-400 sm:text-4xl">Your gateway to crypto diversification!</h1>
            </div>

            <p className="mt-10 text-lg leading-8 text-slate-400">Our platform allows you to effortlessly invest in multiple cryptocurrencies with just one click. Harnessing the power of blockchain technology, we ensure transparency, reduce transaction costs, and automate portfolio rebalancing. With Basket, investing in the dynamic world of cryptocurrencies becomes easy, efficient, and secure. Welcome to the future of crypto investment!</p>

            <div className="flex flex-col mt-10 justify-center sm:flex-row gap-4 items-center sm:items-stretch">
                <ButtonLink to="/investing" className="w-72 h-12 items-center">
                    Get started
                </ButtonLink>

                <ButtonLink to='https://toasti3-hd.gitbook.io/basket/' className="w-72 h-12 bg-slate-600 items-center hover:bg-slate-500">
                     <BookOpenIcon className="h-8 w-8 mx-2"/>
                     Learn More!
                </ButtonLink>
            </div>

        </div>
            
            
            
            

    )
}
