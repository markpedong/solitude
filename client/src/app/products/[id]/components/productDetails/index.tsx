'use client'

import React, { FC, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { CheckOutlined, MinusOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Rate, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import Rating from '@/components/products/rating'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/redux/store'
import { TProduct } from '@/api'
import { useRouter } from 'next/navigation'

type Props = {
	data: TProduct
	products: TProduct[]
}
const scaleSize = { scale: 0.9 }

const sizeOption = [
	{
		label: 'small',
		value: 1
	},
	{
		label: 'medium',
		value: 2
	},
	{
		label: 'large',
		value: 3
	},
	{
		label: 'x-large',
		value: 4
	}
]

const ProductDetails: FC<Props> = ({ data, products }) => {
	const [selectedSize, setSelectedSize] = useState<number>()
	const [qty, setQty] = useState<number>(1)
	const { darkMode } = useAppSelector(s => s.boolean)
	const router = useRouter()

	const onChange = (key: string) => {
		console.log(key)
	}

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Product Details',
			children: 'Content of Tab Pane 1'
		},
		{
			key: '2',
			label: 'Rating & Reviews',
			children: <Rating products={products} />
		},
		{
			key: '3',
			label: 'FAQs',
			children: 'Content of Tab Pane 3'
		}
	]

	const memoizedImageContainer = useMemo(
		() => (
			<div className={styles.productImageContainer}>
				{data?.image?.slice(0, 5).map((q, i) => (
					<div key={q + i}>
						<Image src={q} alt="product_image" height={100} width={100} />
					</div>
				))}
			</div>
		),
		[]
	)

	const memoizedRateContainer = useMemo(
		() => (
			<div className={styles.rateContainer}>
				<Rate value={4.5} />
				<span>
					4.5/<p>5</p>
				</span>
			</div>
		),
		[]
	)

	const memoizedColorContainer = useMemo(
		() => (
			<div className={styles.variationContainer}>
				<span className={styles.label}>Select Color</span>
				<div>
					<span>
						<CheckOutlined />
					</span>
					<span>
						<CheckOutlined />
					</span>
					<span>
						<CheckOutlined />
					</span>
				</div>
			</div>
		),
		[]
	)

	useEffect(() => {
		if (!!!data) {
			router.push('/products')
		}
	}, [])

	return (
		<div className={styles.productWrapper}>
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
					<span className={styles.description}>{data?.description}</span>
					{memoizedColorContainer}
					<div className={styles.sizeVariationContainer}>
						<span className={styles.label}>Choose Size</span>
						<div>
							{sizeOption?.map(q => (
								<motion.span
									style={
										selectedSize === q.value
											? {
													background: darkMode ? 'white' : 'black',
													color: darkMode ? 'black' : 'white'
											  }
											: {}
									}
									onClick={() => setSelectedSize(q.value)}
									whileTap={scaleSize}
									key={q.value}
								>
									{q.label}
								</motion.span>
							))}
						</div>
					</div>
					<div className={styles.addToCartContainer}>
						<div className={styles.addToCart}>
							<motion.span whileTap={scaleSize} onClick={() => setQty(qty => (qty > 0 ? qty - 1 : qty))}>
								<MinusOutlined />
							</motion.span>
							<span>{qty}</span>
							<motion.span whileTap={scaleSize} onClick={() => setQty(qty => qty + 1)}>
								<PlusOutlined />
							</motion.span>
						</div>
						<motion.div whileTap={scaleSize} className={styles.button}>
							Add to Cart
						</motion.div>
					</div>
				</div>
			</div>
			<div className={styles.tabsContainer}>
				<Tabs centered defaultActiveKey="2" items={items} onChange={onChange} />
			</div>
		</div>
	)
}

export default ProductDetails
