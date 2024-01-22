/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'random.imagecdn.app' }, { hostname: 'res.cloudinary.com' }],
    },
    reactStrictMode: false,
}

module.exports = nextConfig
