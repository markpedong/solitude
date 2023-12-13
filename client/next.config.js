/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/users/:path*',
                destination: 'http://localhost:8080/users/:path*', // Proxy to Backend
            },
        ]
    },
}

module.exports = nextConfig
