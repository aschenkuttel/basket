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
        ],
    },
}

module.exports = nextConfig
