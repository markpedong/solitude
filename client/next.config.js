/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'random.imagecdn.app' }],
    },
    reactStrictMode: false,
}

module.exports = nextConfig
