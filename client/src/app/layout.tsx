import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import ReduxProvider from '@/redux/provider'
import '@/styles/global.scss'
import AntdProvider from './antdProvider'
import NavBanner from '@/components/navbanner'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const RootLayout = ({ children }: React.PropsWithChildren) => (
	<html lang="en">
		<body>
			<AntdRegistry>
				<ReduxProvider>
					<AntdProvider>
						<NavBanner />
						<Navbar />
						{children}
						<Footer/>
					</AntdProvider>
				</ReduxProvider>
			</AntdRegistry>
		</body>
	</html>
)

export default RootLayout
//
//
