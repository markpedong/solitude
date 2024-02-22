'use client'

import React, { useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { CheckOutlined, MinusOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Rate, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import Rating from '@/components/products/rating'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/redux/store'

type Props = {}

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

const ProductID = (props: Props) => {
	const [selectedSize, setSelectedSize] = useState<number>()
	const { darkMode } = useAppSelector(s => s.boolean)
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
			children: <Rating />
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
				<div className={styles.div1}>
					<Image src="/assets/products/tshirt-sample.png" alt="sample" height={100} width={100} />
				</div>
				<div className={styles.div2}>
					<Image src="/assets/products/tshirt-sample.png" alt="sample" height={100} width={100} />
				</div>
				<div className={styles.div3}>
					<Image src="/assets/products/tshirt-sample.png" alt="sample" height={100} width={100} />
				</div>
				<div className={styles.div4}>
					<Image src="/assets/products/tshirt-sample.png" alt="sample" height={100} width={100} />
				</div>
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

	return (
		<div className={styles.productWrapper}>
			<div className={styles.mainContainer}>
				{memoizedImageContainer}
				<div className={styles.descriptionContainer}>
					<span className={styles.productTitle}>One Life Graphic Tshirt</span>
					{memoizedRateContainer}
					<div className={styles.priceContainer}>
						<span>₱260</span>
						<span>₱300</span>
						<span>-40%</span>
					</div>
					<span className={styles.description}>This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</span>
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
								>
									{q.label}
								</motion.span>
							))}
						</div>
					</div>
					<div className={styles.addToCartContainer}>
						<div className={styles.addToCart}>
							<motion.span whileTap={scaleSize}>
								<MinusOutlined />
							</motion.span>
							<span>1</span>
							<motion.span whileTap={scaleSize}>
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

export default ProductID
