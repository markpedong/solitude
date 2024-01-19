'use client'

import t from '@/styles/theme'
import { getLocalStorage } from '@/utils/xLocalStorage'
import { ConfigProvider, theme } from 'antd'
import enUS from 'antd/locale/en_US'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    const darkMode = getLocalStorage('dark')

    return (
        <Provider store={store}>
            <ConfigProvider
                theme={{ ...t, algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}
                locale={enUS}>
                {children}
            </ConfigProvider>
        </Provider>
    )
}

export default ReduxProvider
