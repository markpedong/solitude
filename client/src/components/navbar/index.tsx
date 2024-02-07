import { Col, Row } from 'antd'
import React from 'react'
import styles from './styles.module.scss'
import { DownOutlined } from '@ant-design/icons'
type Props = {}

const Navbar = (props: Props) => {
	return (
		<div className={styles.navbarWrapper}>
			<div className={styles.navbarLogo}>SOLITUDE</div>
			<div className={styles.navbarHeader}>
				<div>
					shop <DownOutlined />
				</div>
				<div>on sale</div>
				<div>new arrivals</div>
				<div>brands</div>
			</div>
		</div>
	)
}

export default Navbar
