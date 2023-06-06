import Image from 'next/image'
import {Button,ButtonLink} from '../components/Button'
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

            <p className="mt-10 text-lg leading-8 text-slate-400">Our platform allows you to effortlessly invest in multiple cryptocurrencies with just one click. Harnessing the power of blockchain technology, we ensure transparency, reduce transaction costs, and automate portfolio rebalancing. With Basket, investing in the dynamic world of cryptocurrencies becomes easy, efficient, and secure. Welcome to the future of crypto investment.</p>


            <div className="flex mt-10 justify-center gap-8">
                <ButtonLink to="/investing" className="w-72">
                    Get started
                </ButtonLink>
                {/*<p className="text-slate-400">or</p>*/}
                <ButtonLink to='/community' className="w-72">
                    Track your Transactions!
                </ButtonLink>
                    </div>

        </div>
            
            
            
            

    )
}
