import { Col, Input, Row } from 'antd'
import React from 'react'
import styles from './styles.module.scss'
import { DownOutlined, SearchOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
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
			<Input className={styles.input} prefix={<SearchOutlined />} placeholder="Filled" variant="filled" />
			<div className={styles.userContainer}>
				<ShoppingCartOutlined />
				<UserOutlined />
			</div>
		</div>
	)
}

export default Navbar
