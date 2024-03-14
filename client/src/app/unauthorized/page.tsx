'use client'

import { clearUserData } from '@/constants/helper'
import { resetBooleanData } from '@/redux/features/booleanSlice'
import { resetUserData } from '@/redux/features/userSlice'
import { useAppDispatch } from '@/redux/store'
import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const UnauthorizedPage = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
    
	useEffect(() => {
		clearUserData()
		dispatch(resetUserData())
		dispatch(resetBooleanData())
	}, [])

	return (
		<div>
			<Result
				status="403"
				title="403"
				subTitle="You are not authorized to access this page, try logging in again."
				extra={
					<Button type="primary" onClick={() => router.push('/')}>
						Back Home
					</Button>
				}
			/>
		</div>
	)
}

export default UnauthorizedPage
