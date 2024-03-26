'use client'

import React, { useState } from 'react'
import styles from './styles.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setIsBannerHidden, setLoginModalOpen } from '@/redux/features/booleanSlice'
import { useDispatch } from 'react-redux'

const NavBanner = () => {
	const { bannerHidden } = useAppSelector(state => state.boolean)
	const dispatch = useDispatch<AppDispatch>()

	return (
		<div className={styles.navWrapper} style={{ display: bannerHidden ? 'none' : '' }}>
			<span>
				Sign up and get 20% off to your first order.{' '}
				<p
					className='cursor-pointer'
					onClick={() => {
						dispatch(setLoginModalOpen(true))
					}}
				>
					Sign Up Now
				</p>
			</span>
			<CloseOutlined onClick={() => dispatch(setIsBannerHidden(true))} />
		</div>
	)
}

export default NavBanner
