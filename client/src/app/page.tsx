'use client'

import Login from '@/components/login/loginPage'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

const Page = () => {
    const dispatch = useDispatch<AppDispatch>()
    const activeModal = useAppSelector(state => state.boolean.activeLoginModal)
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    dispatch(setActiveLoginModal(true))
                }}>
                login
            </Button>
            {activeModal && <Login />}
        </div>
    )
}

export default Page
