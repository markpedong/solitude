'use client'

import { ConfigProvider, theme } from 'antd'
import React, { FC } from 'react'
import t from '@/styles/theme'
import { useAppSelector } from '@/redux/store'

type Props = {
	children: React.ReactNode
}

const AntdProvider: FC<Props> = ({ children }) => {
	const { darkMode } = useAppSelector(state => state.boolean)
	return <ConfigProvider theme={{ ...t, algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>{children}</ConfigProvider>
}

export default AntdProvider
