'use client'

import { TProduct, checkCart, sellerLogin, sellerSignup, userLogin, userSignup } from '@/api'
import Profile from '@/components/profile'
import { USER_TYPES, scaleSize } from '@/constants'
import { afterModalformFinish, capFrstLtr, clearUserData } from '@/constants/helper'
import { resetBooleanData, setActiveLoginForm, setDarkMode, setIsBannerHidden, setLoginModalOpen } from '@/redux/features/booleanSlice'
import { resetUserData, setCart, setSellerData, setType, setUserData, setUserToken } from '@/redux/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setLocalStorage } from '@/utils/xLocalStorage'
import { DownOutlined, MenuOutlined, MoonOutlined, SearchOutlined, ShoppingCartOutlined, SunOutlined, UserOutlined } from '@ant-design/icons'
import { ActionType, ModalForm, ProFormInstance } from '@ant-design/pro-components'
import type { MenuProps } from 'antd'
import { Drawer, Dropdown, Input, Select, Space, Typography } from 'antd'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import LoginModal from './loginModal'
import styles from './styles.module.scss'
import Cart from '@/components/reusable/cart'
import { Jost } from 'next/font/google'
import { messageHelper } from '@/constants/antd'
import { IoSearch } from 'react-icons/io5'
import type { SelectProps } from 'antd'
import Image from 'next/image'

const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
	title: string
}

const MenuItem: FC<Props> = ({ title }) => {
	return <div className={styles.mobileMenuItem}>{title}</div>
}

const Navbar: FC<{ products: TProduct[] }> = ({ products }) => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const pathname = usePathname()
	const actionRef = useRef<ActionType>()
	const formRef = useRef<ProFormInstance>()
	const selectRef = useRef(null)
	const { isLoggedIn, type } = useAppSelector(state => state.userData)
	const { activeLoginForm, darkMode, isLoginModalOpen } = useAppSelector(state => state.boolean)
	const {
		userData: { userCart, id }
	} = useAppSelector(s => s.userData)
	const [open, setOpen] = useState(false)
	const [cartModal, setCartModal] = useState(false)

	const create = activeLoginForm === 'create'
	const user = activeLoginForm === 'user'
	const seller = activeLoginForm === 'seller'

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const options: SelectProps['options'] = products?.map(q => ({
		label: capFrstLtr(q?.product_name),
		image: q?.image?.[0],
		value: q?.product_id
	}))

	const items: MenuProps['items'] = [
		{
			key: 'account',
			label: <Profile />
		},
		{
			key: 'details',
			label: (
				<span className={classNames(`uppercase`, jost.className)} onClick={() => router.push('/account')}>
					details
				</span>
			)
		},
		{
			key: 'logout',
			danger: true,
			label: (
				<Typography.Link
					className={styles.menuItems}
					onClick={async () => {
						clearUserData()
						dispatch(resetUserData())
						dispatch(resetBooleanData())
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

		if (!!!res?.success) {
			messageHelper(res)
			return
		}

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

		if (pathname === '/' || '/unauthorized') {
			router.push('/account')
		}

		return afterModalformFinish(actionRef, res?.message, res?.success)
	}

	const handleChangeTheme = () => {
		dispatch(setDarkMode(!darkMode))
	}

	const renderCart = () => (
		<ModalForm
			open={!!!userCart?.length ? false : cartModal}
			modalProps={{
				closeIcon: false
			}}
			onOpenChange={async visible => {
				if (visible) {
					const res = await checkCart({ user_id: id })

					dispatch(setCart(res?.data ?? []))
				}
			}}
			submitter={{
				render: props => (
					<div className={styles.footerBtn}>
						<motion.div
							whileTap={scaleSize}
							className={styles.cancelBtn}
							onClick={() => {
								setCartModal(false)
							}}
						>
							Cancel
						</motion.div>
						{!!userCart?.length && (
							<div className={styles.cartBtnCon}>
								<motion.div
									whileTap={scaleSize}
									className={styles.checkoutBtn}
									onClick={() => {
										router.push('/checkout')
										setCartModal(false)
									}}
								>
									Checkout
								</motion.div>
							</div>
						)}
					</div>
				)
			}}
			title={<div className={styles.header}>your cart</div>}
		>
			<div className={styles.orderContainer}>
				{/* {userCart &&
					(userCart?.length > 1
						? userCart.slice(0, -1).map(q => <Cart data={q} key={q?.checkout_id} />)
						: userCart.map(q => <Cart data={q} key={q?.checkout_id} divider={false} />))}
				{userCart?.length > 1 && <Cart data={userCart?.findLast(q => q)} divider={false} />} */}
				{userCart?.map(q => (
					<>
						<div className={styles.sellerName}>{q?.seller_name}</div>
						{q.products &&
							(q.products?.length > 1
								? q.products.slice(0, -1).map(q => <Cart data={q} key={q?.checkout_id} />)
								: q.products.map(q => <Cart data={q} key={q?.checkout_id} divider={false} />))}
						{q.products?.length > 1 && <Cart data={q.products?.findLast(q => q)} divider={false} />}
					</>
				))}
			</div>
		</ModalForm>
	)

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

	const memoizedCartButton = useMemo(
		() => (
			<motion.div whileTap={scaleSize} onClick={() => setCartModal(true)} className="relative">
				<span className={styles.cartLength}>{userCart?.length}</span>
				<ShoppingCartOutlined className="cursor-pointer" />
			</motion.div>
		),
		[userCart?.length]
	)

	const fetchCart = async () => {
		const cart = await checkCart({ user_id: id })

		dispatch(setCart(cart?.data))
	}

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
	}, [darkMode])

	useEffect(() => {
		!!id && fetchCart()
	}, [])

	return (
		<>
			{renderLoginModal()}
			{renderCart()}
			<div className={styles.navbarWrapper}>
				<div className={styles.navbarContainer}>
					<MenuOutlined className={styles.navbarMobile} onClick={showDrawer} />
					<Drawer onClose={onClose} open={open}>
						<MenuItem title="shop" />
						<MenuItem title="on sale" />
						<MenuItem title="new arrivals" />
						<MenuItem title="brands" />
					</Drawer>
					<motion.div whileTap={scaleSize} className={classNames(styles.navbarLogo, 'cursor-pointer')} onClick={() => router.push('/')}>
						SOLITUDE
					</motion.div>
					<div className={styles.navbarHeader}>
						<div onClick={() => router.push('/products')}>
							shop <DownOutlined />
						</div>
						<div>on sale</div>
						<div onClick={() => router.push('/products')}>new arrivals</div>
						<div>brands</div>
					</div>
					<Input
						className={styles.input}
						placeholder="Search for a product"
						prefix={<IoSearch />}
						// options={options}
						// autoClearSearchValue
						ref={selectRef}
						autoFocus={false}
						allowClear
						onPressEnter={e => {
							router.push(`/products?search=${e?.currentTarget?.value}`)
						}}
						// onChange={e => {
						// 	router.push(`/products/${e}`)
						// }}
						// optionRender={option => {
						// 	return (
						// 		<Space>
						// 			<Image src={option?.data?.image} width={20} height={20} alt={String(option?.value)} />
						// 			{option?.data?.label}
						// 		</Space>
						// 	)
						// }}
					/>
					<div className={styles.userContainer}>
						<SearchOutlined className={styles.smallInput} />
						{isLoggedIn && userCart?.length > 0 && !pathname.includes('/checkout') && memoizedCartButton}
						{isLoggedIn ? (
							<Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
								<UserOutlined className="cursor-pointer" onClick={e => e.preventDefault()} />
							</Dropdown>
						) : (
							<UserOutlined onClick={() => dispatch(setLoginModalOpen(true))} />
						)}
						<motion.div whileTap={scaleSize}>{darkMode ? <MoonOutlined onClick={handleChangeTheme} /> : <SunOutlined onClick={handleChangeTheme} />}</motion.div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
