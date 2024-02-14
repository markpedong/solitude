'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { getLocalStorage } from '@/utils/xLocalStorage'
import { useAppSelector } from '@/redux/store'

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const { isLoggedIn } = useAppSelector(state => state.userData)
        const auth = !!getLocalStorage('token') && isLoggedIn

        useEffect(() => {
            if (!auth) {
                return redirect('/')
            }
        }, [])

        if (!auth) {
            return null
        }

        return <Component {...props} />
    }
}
