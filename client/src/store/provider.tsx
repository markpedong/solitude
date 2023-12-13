'use client'
import React, { Children, FC } from 'react'
import { Provider } from 'react-redux'
import { store } from './index'

type Props = {
    children: React.ReactNode
}

const StoreProvider = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
