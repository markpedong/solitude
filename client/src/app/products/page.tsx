'use client'

import React from 'react'
import styles from './styles.module.scss'
import { CheckOutlined, MinusOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Rate, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import Rating from '@/components/products/rating'

type Props = {}

const Products = (props: Props) => {
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

	return (
		<div className={styles.productWrapper}>
			<div className={styles.productCategory}>
				<span>Home</span>
				<RightOutlined />
				<span>Shop</span>
				<RightOutlined />
				<span>T-shirts</span>
			</div>
			<div className={styles.mainContainer}>
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
				<div className={styles.descriptionContainer}>
					<span className={styles.productTitle}>One Life Graphic Tshirt</span>
					<div className={styles.rateContainer}>
						<Rate value={4.5} />
						<span>
							4.5/<p>5</p>
						</span>
					</div>
					<div className={styles.priceContainer}>
						<span>₱260</span>
						<span>₱300</span>
						<span>-40%</span>
					</div>
					<span className={styles.description}>This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</span>
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
					<div className={styles.sizeVariationContainer}>
						<span className={styles.label}>Choose Size</span>
						<div>
							<span>small</span>
							<span>medium</span>
							<span>large</span>
							<span>x-large</span>
						</div>
					</div>
					<div className={styles.addToCartContainer}>
						<div className={styles.addToCart}>
							<MinusOutlined />
							<span>1</span>
							<PlusOutlined />
						</div>
						<div className={styles.button}>Add to Cart</div>
					</div>
				</div>
			</div>
			<div className={styles.tabsContainer}>
				<Tabs centered defaultActiveKey="2" items={items} onChange={onChange} />
			</div>
		</div>
	)
}

export default Products
