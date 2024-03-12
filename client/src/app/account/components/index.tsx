'use client'

import { TProduct, checkCart } from '@/api'
import isAuth from '@/components/isAuth'
import { USER_TYPES } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Flex, Tabs } from 'antd'
import { Jost } from 'next/font/google'
import { FC, useEffect } from 'react'
import AddProduct from './addProduct'
import ProductsAdded from './addedProduct'
import Address from './address'
import Orders from './orders'
import styles from './styles.module.scss'
import { setCart } from '@/redux/features/userSlice'

const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
	products: TProduct[]
}

const Account: FC<Props> = () => {
	const dispatch = useAppDispatch()
	const { userData, type, sellerData } = useAppSelector(state => state.userData)
	const seller = type === USER_TYPES.SELLER

	const fetchCart = async () => {
		const res = await checkCart({ user_id: userData?.id })

		dispatch(setCart(res?.data))
	}
	useEffect(() => {
		fetchCart()
	}, [])

	return (
		<>
			<Flex className={styles.profileHeader} vertical gap={5} justify="center">
				<span>Welcome back, {userData?.first_name || sellerData?.seller_name}</span>
				<span className={jost.className}>{userData?.id ? 'Enjoy shopping with ease and happiness.' : 'Sell your products with ease and happiness!'}</span>
			</Flex>
			<div className={styles.tabsContainer}>
				<Tabs
					type="card"
					defaultActiveKey={seller ? 'products' : 'orders'}
					items={[
						{ key: 'orders', label: 'ORDERS', children: <Orders /> },
						{ key: 'products', label: 'ADD PRODUCT', children: <AddProduct /> },
						{ key: 'listed_products', label: 'PRODUCTS ADDED', children: <ProductsAdded /> },
						{ key: 'address', label: 'ADDRESS', children: <Address /> }
					].filter(item => !(item.key === 'products' && !seller) && !(item.key === 'orders' && seller) && !(item.key === 'address' && seller) && !(item.key === 'listed_products' && !seller))}
				/>
			</div>
		</>
	)
}

export default isAuth(Account)
