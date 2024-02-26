'use client'

import { sellerLogin, sellerSignup, userLogin, userSignup } from '@/api'
import Profile from '@/components/profile'
import { USER_TYPES } from '@/constants'
import { afterModalformFinish } from '@/constants/helper'
import { setActiveLoginForm, setDarkMode, setIsBannerHidden, setLoginModalOpen } from '@/redux/features/booleanSlice'
import { resetUserData, setSellerData, setType, setUserData, setUserToken } from '@/redux/features/userSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setLocalStorage } from '@/utils/xLocalStorage'
import { DownOutlined, MenuOutlined, MoonOutlined, SearchOutlined, ShoppingCartOutlined, SunOutlined, UserOutlined } from '@ant-design/icons'
import { ActionType, ModalForm, ProFormInstance } from '@ant-design/pro-components'
import type { MenuProps } from 'antd'
import { Drawer, Dropdown, Input, Typography } from 'antd'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import LoginModal from './loginModal'
import styles from './styles.module.scss'

type Props = {
	title: string
}

const MenuItem: FC<Props> = ({ title }) => {
	return <div className={styles.mobileMenuItem}>{title}</div>
}

const Navbar = () => {
	const router = useRouter()
	const pathname = usePathname()
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch<AppDispatch>()
	const { activeLoginForm, darkMode, isLoginModalOpen } = useAppSelector(state => state.boolean)
	const { isLoggedIn, type } = useAppSelector(state => state.userData)
	const formRef = useRef<ProFormInstance>()
	const actionRef = useRef<ActionType>()
	const create = activeLoginForm === 'create'
	const user = activeLoginForm === 'user'
	const seller = activeLoginForm === 'seller'

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const items: MenuProps['items'] = [
		{
			key: 'account',
			label: <Profile />
		},
		{
			key: 'logout',
			danger: true,
			label: (
				<Typography.Link
					className={styles.menuItems}
					onClick={async () => {
						await dispatch(resetUserData())
						localStorage.clear()
						router.push('/')
					}}
					type="danger"
				>
					LOGOUT
				</Typography.Link>
			)
		}
	]

	const handleFinish = async params => {
		let res

		if (create && type === USER_TYPES.USER) {
			res = await userSignup(params)
			dispatch(setType(USER_TYPES.USER))
		}

		if (create && type === USER_TYPES.SELLER) {
			res = await sellerSignup(params)
			dispatch(setType(USER_TYPES.SELLER))
		}

		if (user) {
			res = await userLogin(params)
			dispatch(setType(USER_TYPES.USER))
		}

		if (seller) {
			res = await sellerLogin(params)
			dispatch(setType(USER_TYPES.SELLER))
		}

		if (res?.success) {
			if (create && type === USER_TYPES.USER) {
				await dispatch(setUserData(res?.data))
			} else {
				await dispatch(setSellerData(res?.data))
			}
			if (user) {
				await dispatch(setUserData(res?.data))
			} else {
				await dispatch(setSellerData(res?.data))
			}
			await dispatch(setUserToken(res?.token))
			await dispatch(setIsBannerHidden(true))

			setLocalStorage('token', res?.token)
			formRef?.current?.resetFields()

			if (pathname === '/') {
				router.push('/account')
			}
		}

		return afterModalformFinish(actionRef, res?.message, res?.success)
	}

	const handleChangeTheme = () => {
		dispatch(setDarkMode(!darkMode))
	}

	const renderLoginModal = () => {
		return (
			<ModalForm
				open={isLoginModalOpen}
				submitter={false}
				width={create ? 1000 : 600}
				modalProps={{ destroyOnClose: true, maskClosable: false }}
				grid={true}
				formRef={formRef}
				preserve={false}
				onOpenChange={visible => {
					if (!visible) {
						formRef?.current?.resetFields()
						dispatch(setActiveLoginForm('user'))
						dispatch(setLoginModalOpen(false))
					}
				}}
				onFinish={handleFinish}
			>
				<LoginModal formRef={formRef} />
			</ModalForm>
		)
	}

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
	}, [darkMode])

	return (
		<>
			{renderLoginModal()}
			<div className={styles.navbarWrapper}>
				<div className={styles.navbarContainer}>
					<MenuOutlined className={styles.navbarMobile} onClick={showDrawer} />
					<Drawer onClose={onClose} open={open}>
						<MenuItem title="shop" />
						<MenuItem title="on sale" />
						<MenuItem title="new arrivals" />
						<MenuItem title="brands" />
					</Drawer>
					<motion.div whileTap={{ scale: 0.8 }} className={classNames(styles.navbarLogo, 'cursor-pointer')} onClick={() => router.push('/')}>
						SOLITUDE
					</motion.div>
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
						{isLoggedIn && (
							<motion.div whileTap={{ scale: 0.8 }}>
								<ShoppingCartOutlined onClick={() => router.push('/cart')} />
							</motion.div>
						)}
						{isLoggedIn ? (
							<Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
								<UserOutlined onClick={e => e.preventDefault()} />
							</Dropdown>
						) : (
							<UserOutlined onClick={() => dispatch(setLoginModalOpen(true))} />
						)}
						<motion.div whileTap={{ scale: 0.8 }}>{darkMode ? <MoonOutlined onClick={handleChangeTheme} /> : <SunOutlined onClick={handleChangeTheme} />}</motion.div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
