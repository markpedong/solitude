import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import ReduxProvider from '@/redux/provider'
import '../styles/global.scss'
import AntdProvider from './antdProvider'

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body>
            <AntdRegistry>
                <ReduxProvider>
                    <AntdProvider>
                        <Navigation />
                        {children}
                    </AntdProvider>
                </ReduxProvider>
                <Footer />
            </AntdRegistry>
        </body>
    </html>
)

export default RootLayout
    //
