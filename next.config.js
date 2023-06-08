/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cryptologos.cc',
                port: '',
                pathname: '/logos/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn2.etrade.net',
                port: '',
                pathname: '/1/19010916210.0/aempros/content/dam/etrade/retail/en_US/images/knowledge/library/stocks/**',
            }
        ],
    },
}

module.exports = nextConfig
