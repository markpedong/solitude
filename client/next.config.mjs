/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'res.cloudinary.com',
				port: ''
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: ''
			}
		]
	}
}

export default nextConfig
