/** @type {import('next').NextConfig} */
const nextConfig = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    async rewrites() {
        return [
            {
                source: '/users/:path*',
                destination: 'http://localhost:8081/users/:path*', // Proxy to Backend
            },
        ]
    },
}

module.exports = nextConfig
