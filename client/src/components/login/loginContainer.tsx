'use client'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import Login from './loginPage'

const LoginContainer = () => {
    const dispatch = useDispatch<AppDispatch>()
    const activeModal = useAppSelector(state => state.boolean.activeLoginModal)

    return (
        <div>
            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, dolorem?</div>
            {activeModal && <Login />}
            <Button
                type="primary"
                onClick={() => {
                    dispatch(setActiveLoginModal(true))
                }}>
                login
            </Button>
        </div>
    )
}

export default LoginContainer
