import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import Navigation from '@/components/navigation'
import { ConfigProvider } from 'antd'
import theme from '@/styles/theme'
import enUS from 'antd/locale/en_US'
import Footer from '@/components/footer'
import ReduxProvider from '@/redux/provider'
import '../styles/global.scss'

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body>
            <AntdRegistry>
                <ConfigProvider theme={theme} locale={enUS}>
                    <ReduxProvider>
                        <Navigation />
                        {children}
                    </ReduxProvider>
                    <Footer />
                </ConfigProvider>
            </AntdRegistry>
        </body>
    </html>
)

export default RootLayout
