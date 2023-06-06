import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum'
import {Web3Modal} from '@web3modal/react'
import {configureChains, createConfig, WagmiConfig} from 'wagmi'
import {bscTestnet} from 'viem/chains'

import {Inter} from 'next/font/google'
import clsx from "clsx"
import Header from "@/components/Header"
import '@/styles/globals.css'
import BasketProvider from "@/components/Context";

const chains = [bscTestnet]
const projectId = '72c7b83811841a26516ce8f339f3144f'

const {publicClient} = configureChains(chains, [w3mProvider({projectId})])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({projectId, version: 1, chains}),
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const inter = Inter({subsets: ['latin']})

export default function App({Component, pageProps}) {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <BasketProvider>
                    <div className={clsx("App", inter.className)}>
                        <Header/>

                        <main className="flex flex-1 justify-center items-center p-4">
                            <Component {...pageProps} />
                        </main>
                    </div>
                </BasketProvider>
            </WagmiConfig>

            <Web3Modal projectId={projectId} ethereumClient={ethereumClient}
                       themeVariables={{
                           '--w3m-font-family': 'Inter, sans-serif',
                           '--w3m-accent-color': '#0891B2'
                       }}
            />
        </>
    )
}
