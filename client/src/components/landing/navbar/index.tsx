'use client'

import { sellerLogin, sellerSignup, userLogin, userSignup } from '@/api'
import { USER_TYPES } from '@/constants'
import { afterModalformFinish } from '@/constants/helper'
import { setActiveLoginForm, setDarkMode } from '@/redux/features/booleanSlice'
import { setSellerData, setType, setUserData, setUserToken } from '@/redux/features/userSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setLocalStorage } from '@/utils/xLocalStorage'
import { DownOutlined, MenuOutlined, MoonFilled, MoonOutlined, SearchOutlined, ShoppingCartOutlined, SunFilled, SunOutlined, UserOutlined } from '@ant-design/icons'
import { ActionType, ModalForm, ProFormInstance } from '@ant-design/pro-components'
import type { MenuProps } from 'antd'
import { Divider, Drawer, Dropdown, Input } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { FC, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import ModalProfile from './modalProfile'
import styles from './styles.module.scss'

type Props = {
	title: string
}

const MenuItem: FC<Props> = ({ title }) => {
	return <div className={styles.mobileMenuItem}>{title}</div>
}

const items: MenuProps['items'] = [
	{
		key: 'account',
		label: <span>ACCOUNT</span>
	},
	{
		key: 'logout',
		label: <span>LOGOUT</span>
	}
]

const Navbar = () => {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch<AppDispatch>()
	const { activeLoginForm, darkMode } = useAppSelector(state => state.boolean)
	const { isLoggedIn, type } = useAppSelector(state => state.userData)
	const formRef = useRef<ProFormInstance>()
	const actionRef = useRef<ActionType>()
	const create = activeLoginForm === 'create'
	const login = activeLoginForm === 'login'
	const seller = activeLoginForm === 'seller'

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const handleFinish = async params => {
		let res

		if (create && type === USER_TYPES.USER) {
			res = await userSignup(params)
			await dispatch(setUserData(res?.data))
			dispatch(setType(USER_TYPES.USER))
		}

		if (create && type === USER_TYPES.SELLER) {
			res = await sellerSignup(params)
			await dispatch(setSellerData(res?.data))
			dispatch(setType(USER_TYPES.SELLER))
		}

		if (login) {
			res = await userLogin(params)
			await dispatch(setUserData(res?.data))
			dispatch(setType(USER_TYPES.USER))
		}

		if (seller) {
			res = await sellerLogin(params)
			await dispatch(setSellerData(res?.data))
			dispatch(setType(USER_TYPES.SELLER))
		}

		if (res?.success) {
			await dispatch(setUserToken(res?.token))
			setLocalStorage('token', res?.token)
			formRef?.current?.resetFields()
			router.push('/account')
		}

		return afterModalformFinish(actionRef, res?.message, res?.success)
	}
	
	const handleChangeTheme = () => dispatch(setDarkMode(!darkMode))

	const renderLoginModal = () => {
		return (
			<ModalForm
				trigger={<UserOutlined />}
				submitter={false}
				width={create ? 1000 : 600}
				modalProps={{ style: { top: create ? '5%' : '10%' }, destroyOnClose: true, maskClosable: false }}
				grid={true}
				formRef={formRef}
				preserve={false}
				onOpenChange={visible => {
					if (!visible) {
						formRef?.current?.resetFields()
						dispatch(setActiveLoginForm('login'))
					}
				}}
				onFinish={handleFinish}>
				<ModalProfile formRef={formRef} />
			</ModalForm>
		)
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
						<ShoppingCartOutlined onClick={() => router.push('/cart')} />
						{isLoggedIn ? (
							<Dropdown menu={{ items }} placement="bottomCenter">
								<UserOutlined onClick={e => e.preventDefault()} />
							</Dropdown>
						) : (
							renderLoginModal()
						)}
						{darkMode ? <MoonOutlined onClick={handleChangeTheme} /> : <SunOutlined onClick={handleChangeTheme}/>}
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
