/** @type {import('next').NextConfig} */

const nextConfig = {
	redirects: async () => {
		return [{ source: '/', permanent: true, destination: '/login' }]
	}
}

module.exports = nextConfig
