'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { getLocalStorage } from '@/utils/xLocalStorage'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { resetUserData } from '@/redux/features/userSlice'

export default function isAuth(Component: any) {
	return function IsAuth(props: any) {
		const dispatch = useDispatch()
		const { isLoggedIn } = useAppSelector(state => state.userData)
		const auth = !!getLocalStorage('token') && isLoggedIn

		useEffect(() => {
			if (!auth) {
				dispatch(resetUserData())
				return redirect('/')
			}
		}, [])

		if (!auth) {
			return null
		}

		return auth && <Component {...props} />
	}
}
