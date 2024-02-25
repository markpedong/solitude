/** @type {import('next').NextConfig} */
const nextConfig = {
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
