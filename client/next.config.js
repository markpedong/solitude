/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'res.cloudinary.com' }, { hostname: 'random.imagecdn.app' }],
    },
    reactStrictMode: false,
}

module.exports = nextConfig
