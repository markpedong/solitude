import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import ReduxProvider from '@/redux/provider'
import '@/styles/global.scss'
import theme from '@/theme/theme'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'
import { Jost } from 'next/font/google'
import React from 'react'

const jost = Jost({ subsets: ['latin'] })

export const metadata = {
    title: 'SOLITUDE',
    description: 'E-Commerce projet that is being written in React and GO',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body className={jost.className}>
            <ReduxProvider>
                <AntdRegistry>
                    <ConfigProvider theme={theme} locale={enUS}>
                        <Navigation />
                        {children}
                        <Footer />
                    </ConfigProvider>
                </AntdRegistry>
            </ReduxProvider>
        </body>
    </html>
)

export default RootLayout
