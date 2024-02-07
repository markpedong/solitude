import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import ReduxProvider from '@/redux/provider'
import '../styles/global.scss'
import AntdProvider from './antdProvider'

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body>
            <AntdRegistry>
                <ReduxProvider>
                    <AntdProvider>
                        {children}
                    </AntdProvider>
                </ReduxProvider>
            </AntdRegistry>
        </body>
    </html>
)

export default RootLayout
//
//
