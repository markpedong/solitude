/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'random.imagecdn.app' }],
    },
}

module.exports = nextConfig
