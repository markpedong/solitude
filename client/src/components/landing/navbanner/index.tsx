'use client'

import React from 'react'
import styles from './styles.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/redux/store'

const NavBanner = () => {
	const { isLoggedIn } = useAppSelector(state => state.userData)
	return (
		<div className={styles.navWrapper} style={{ display: isLoggedIn ? 'none' : '' }}>
			<span>
				Sign up and get 20% off to your first order. <p>Sign Up Now</p>
			</span>
			<CloseOutlined />
		</div>
	)
}

export default NavBanner
