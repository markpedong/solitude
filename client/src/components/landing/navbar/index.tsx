'use client'

import { DownOutlined, MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Divider, Drawer, Input } from 'antd'
import { FC, useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'

type Props = {
	title: string
}

const MenuItem: FC<Props> = ({ title }) => {
	return <div className={styles.mobileMenuItem}>{title}</div>
}

const Navbar = () => {
	const router = useRouter()
	const [open, setOpen] = useState(false)

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	return (
		<>
			<div className={styles.navbarWrapper}>
				<div className={styles.navbarContainer}>
					<MenuOutlined className={styles.navbarMobile} onClick={showDrawer} />
					<Drawer onClose={onClose} open={open}>
						<MenuItem title="shop" />
						<MenuItem title="on sale" />
						<MenuItem title="new arrivals" />
						<MenuItem title="brands" />
					</Drawer>
					<div className={classNames(styles.navbarLogo, 'cursor-pointer')} onClick={() => router.push('/')}>
						SOLITUDE
					</div>
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
						<SearchOutlined className={styles.smallInput} />
						<ShoppingCartOutlined />
						<UserOutlined />
					</div>
				</div>
			</div>
			<Divider />
		</>
	)
}

export default Navbar
