'use client'

import React, { FC, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { MinusOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Rate, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/redux/store'
import { TProduct, addToCart, checkCart } from '@/api'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setLoginModalOpen } from '@/redux/features/booleanSlice'
import Rating from '../rating'
import { messageHelper } from '@/constants/antd'
import { capFrstLtr } from '@/constants/helper'
import OtherDetails from '../otherDetails'

type Props = {
	data: TProduct
	products: TProduct[]
}
const scaleSize = { scale: 0.9 }
const ProductDetails: FC<Props> = ({ data, products }) => {
	const { token, userData } = useAppSelector(s => s.userData)
	const [qty, setQty] = useState<number>(1)
	const router = useRouter()
	const params = useParams()
	const dispatch = useDispatch()

	const onChange = (key: string) => {
		console.log(key)
	}

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Product Details',
			children: <OtherDetails data={data} />
		},
		{
			key: '2',
			label: 'Rating & Reviews',
			children: <Rating products={products} curr={params.id as string} />
		}
		// {
		// 	key: '3',
		// 	label: 'FAQs',
		// 	children: 'Content of Tab Pane 3'
		// }
	]

	const memoizedImageContainer = useMemo(
		() => (
			<div className={styles.productImageContainer}>
				{data?.image?.slice(0, 5).map((q, i) => (
					<div key={q + i}>
						<Image src={q} alt="product_image" height={100} width={100} priority />
					</div>
				))}
			</div>
		),
		[]
	)

	const memoizedRateContainer = useMemo(
		() => (
			<div className={styles.rateContainer}>
				<Rate value={data?.rating} disabled />
				<span className={styles.rate}>
					{data?.rating} / <p>5</p>
				</span>
			</div>
		),
		[]
	)

	const handleAddtoCart = async () => {
		if (!!!token) {
			dispatch(setLoginModalOpen(true))
			return
		}
		const res = await checkCart({ user_id: userData?.id })

		if (res?.data.findIndex(q => q.product_id === params.id) === -1) {
			const res = await addToCart({ user_id: userData?.id, product_id: data?.product_id })
			messageHelper(res?.message)
			return
		}
	}

	useEffect(() => {
		if (!!!data) {
			router.push('/products')
		}
	}, [])
	return (
		<div className={styles.productWrapper}>
			<div className={styles.productCategory}>
				<span>Products</span>
				<RightOutlined />
				<span>{capFrstLtr(data?.categories?.[0])}</span>
				<RightOutlined />
				<span>{capFrstLtr(data?.categories?.[1])}</span>
			</div>
			<div className={styles.mainContainer}>
				{memoizedImageContainer}
				<div className={styles.descriptionContainer}>
					<span className={styles.productTitle}>{data?.product_name}</span>
					{memoizedRateContainer}
					<div className={styles.priceContainer}>
						<span>₱{data?.price}</span>
						<span>₱{data?.price}</span>
						<span>-40%</span>
					</div>
					{/* <span className={styles.description}>{data?.description}</span> */}
					<div className={styles.variationWrapper}>
						{data?.variations.map(q => (
							<div className={styles.variationContainer} key={q.id}>
								<span className={styles.label}>{capFrstLtr(q?.label)}:</span>
								<div className={styles.options}>
									{q?.value.map(w => (
										<motion.span
											// style={
											// 	selectedSize === w.id
											// 		? {
											// 				background: darkMode ? 'white' : 'black',
											// 				color: darkMode ? 'black' : 'white'
											// 		  }
											// 		: {}
											// }
											// onClick={() => setSelectedSize(q.value)}
											whileTap={scaleSize}
											key={w.id}
										>
											{w.value}
										</motion.span>
									))}
								</div>
							</div>
						))}
					</div>
					<div className={styles.addToCartContainer}>
						<div className={styles.stockText}>Stocks: {data?.stock}</div>
						<div className={styles.addToCartButton}>
							<div className={styles.addToCart}>
								<motion.span whileTap={{ scale: 0.7 }} onClick={() => setQty(qty => (qty > 1 ? qty - 1 : qty))}>
									<MinusOutlined />
								</motion.span>
								<span>{qty}</span>
								<motion.span whileTap={{ scale: 0.7 }} onClick={() => setQty(qty => qty + 1)}>
									<PlusOutlined />
								</motion.span>
							</div>
							<motion.div whileTap={scaleSize} className={styles.button} onClick={handleAddtoCart}>
								Add to Cart
							</motion.div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.tabsContainer}>
				<Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
			</div>
		</div>
	)
}

export default ProductDetails
