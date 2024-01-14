'use client'

import { Provider } from 'react-redux'
import { store, useAppSelector } from './store'
import React from 'react'
import { ConfigProvider, theme } from 'antd'
import t from '@/styles/theme'
import enUS from 'antd/locale/en_US'
import { getLocalStorage } from '@/utils/xLocalStorage'

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
