import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import ReduxProvider from '@/redux/provider'
import '@/styles/global.scss'
import AntdProvider from './antdProvider'
import NavBanner from '@/components/landing/navbanner'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { getProducts } from '@/api'

const RootLayout = async ({ children }: React.PropsWithChildren) => {
	const products = await getProducts({})

	return (
		<html lang="en">
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<body>
				<AntdRegistry>
					<ReduxProvider>
						<AntdProvider>
							<NavBanner />
							<Navbar products={products?.data} />
							{children}
							<Footer />
						</AntdProvider>
					</ReduxProvider>
				</AntdRegistry>
			</body>
		</html>
	)
}

export default RootLayout
