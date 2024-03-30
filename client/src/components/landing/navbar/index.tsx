'use client'

import { TProduct, checkCart, sellerLogin, sellerSignup, userLogin, userSignup } from '@/api'
import Cart from '@/components/reusable/cart'
import { USER_TYPES, scaleSize } from '@/constants'
import { messageHelper } from '@/constants/antd'
import { afterModalformFinish } from '@/constants/helper'
import { setActiveLoginForm, setDarkMode, setIsBannerHidden, setLoginModalOpen } from '@/redux/features/booleanSlice'
import { setCart, setSellerData, setType, setUserData, setUserToken } from '@/redux/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { setLocalStorage } from '@/utils/xLocalStorage'
import {
	MenuOutlined,
	MoonOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
	SunOutlined,
	UserOutlined
} from '@ant-design/icons'
import { ActionType, ModalForm, ProFormInstance } from '@ant-design/pro-components'
import { Drawer, Input } from 'antd'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import StaggeredDropDown from './dropdown'
import LoginModal from './loginModal'
import styles from './styles.module.scss'

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
	const [cartModal, setCartModal] = useState<boolean>()
	const create = activeLoginForm === 'create'
	const user = activeLoginForm === 'user'
	const seller = activeLoginForm === 'seller'

	const showDrawer = () => {
		setOpen(true)
	}

	const onClose = () => {
		setOpen(false)
	}

	const handleFinish = async params => {
		let res

		if (create) {
			if (type === USER_TYPES.USER) {
				res = await userSignup(params)
			} else if (type === USER_TYPES.SELLER) {
				res = await sellerSignup(params)
			}
			dispatch(setType(type))
		} else if (user) {
			res = await userLogin(params)
			dispatch(setType(USER_TYPES.USER))
		} else if (seller) {
			res = await sellerLogin(params)
			dispatch(setType(USER_TYPES.SELLER))
		}

		if (!res?.success) {
			messageHelper(res)
			return
		}

		if (create) {
			if (type === USER_TYPES.USER) {
				await dispatch(setUserData(res?.data))
			} else if (type === USER_TYPES.SELLER) {
				await dispatch(setSellerData(res?.data))
			}
		} else {
			if (user) {
				await dispatch(setUserData(res?.data))
			} else if (seller) {
				await dispatch(setSellerData(res?.data))
			}
		}

		setLocalStorage('token', res?.token)
		await dispatch(setUserToken(res?.token))
		await dispatch(setIsBannerHidden(true))
		formRef?.current?.resetFields()

		window.location.replace('/account')

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
				{userCart?.map(q => (
					<div key={q?.seller_id}>
						<div className={styles.sellerName}>{q?.seller_name}</div>
						{!!q?.products?.length &&
							(q.products?.length > 1
								? q.products.slice(0, -1).map(q => <Cart data={q} key={q?.checkout_id} />)
								: q.products.map(q => <Cart data={q} key={q?.checkout_id} divider={false} />))}
						{q.products?.length > 1 && <Cart data={q.products?.findLast(q => q)} divider={false} />}
					</div>
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
						dispatch(setType(1))
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
				<span className={styles.cartLength}>{userCart?.flatMap(q => q?.products).length}</span>
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
		dispatch(setLoginModalOpen(false))
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
					<motion.div
						whileTap={scaleSize}
						className={classNames(styles.navbarLogo, 'cursor-pointer')}
						onClick={() => router.push('/')}
					>
						SOLITUDE
					</motion.div>
					<div className={styles.navbarHeader}>
						<div onClick={() => router.push('/products')}>
							shop
							{/* <DownOutlined /> */}
						</div>
						<div onClick={() => router.push('/sale')}>on sale</div>
						<div onClick={() => router.push('/products')}>new arrivals</div>
						<div onClick={() => router.push('/brands')}>brands</div>
					</div>
					<Input
						className={styles.input}
						placeholder="Search for a product"
						prefix={<IoSearch />}
						ref={selectRef}
						autoFocus={false}
						allowClear
						onPressEnter={e => {
							router.push(`/products?search=${e?.currentTarget?.value}`)
						}}
					/>
					<div className={styles.userContainer}>
						<SearchOutlined className={styles.smallInput} />
						{isLoggedIn && userCart?.length > 0 && !pathname.includes('/checkout') && memoizedCartButton}
						{isLoggedIn ? <StaggeredDropDown /> : <UserOutlined onClick={() => dispatch(setLoginModalOpen(true))} />}
						<motion.div whileTap={scaleSize}>
							{darkMode ? <MoonOutlined onClick={handleChangeTheme} /> : <SunOutlined onClick={handleChangeTheme} />}
						</motion.div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
