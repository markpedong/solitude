import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

const NavBanner = () => {
	return (
		<div className={classNames(styles.navWrapper)}>
			<span>Sign up and get 20% off to your first order. Sign Up Now</span>
		</div>
	)
}

export default NavBanner
