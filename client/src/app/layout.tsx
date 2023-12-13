import React from 'react'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '@/lib/antdRegistry'
import './styles.module.scss'

import '@/styles/global.scss'
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'
import theme from '@/styles/theme'
import { Provider } from 'react-redux'
import { store } from '@/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'SOLITUDE',
    description: 'E-Commerce projet that is being written in React and GO',
}

const RootLayout = ({ children }: React.PropsWithChildren) => (
    <html lang="en">
        <body className={inter.className}>
            <Provider store={store}>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={theme} locale={enUS}>
                        {children}
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </Provider>
        </body>
    </html>
)

export default RootLayout
