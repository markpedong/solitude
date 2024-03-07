'use client'

import React, { FC, useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { MinusOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Divider, Rate, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/redux/store'
import { SellerData, TProduct, addToCart, checkCart } from '@/api'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setLoginModalOpen } from '@/redux/features/booleanSlice'
import Rating from '../rating'
import { messageHelper } from '@/constants/antd'
import { capFrstLtr } from '@/constants/helper'
import OtherDetails from '../otherDetails'
import { LandingContent } from '@/components/reusable'
import { scaleSize, scaleSizeSm } from '@/constants'

type Props = {
	data: TProduct
	products: TProduct[]
	seller: SellerData
}

const ProductDetails: FC<Props> = ({ data, products, seller }) => {
	const { token, userData } = useAppSelector(s => s.userData)
	const { darkMode } = useAppSelector(s => s.boolean)
	const [qty, setQty] = useState<number>(1)
	const [firstImage, setFirstImage] = useState(data?.image?.[0])
	const [selectedVariations, setSelectedVariations] = useState({})
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
			children: <OtherDetails data={data} seller={seller} />
		},
		{
			key: '2',
			label: 'Rating & Reviews',
			children: <Rating products={products} curr={params.id as string} rating={[]} />
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
				<div>
					<Image src={firstImage ?? data?.image?.[0]} alt="product_image" height={100} width={100} priority />
				</div>
				{data?.image?.slice(1, 5).map((q, i) => (
					<div key={q} onMouseEnter={() => setFirstImage(q)} onMouseLeave={() => setFirstImage(data?.image?.[0])}>
						<Image src={q} alt="product_image" height={100} width={100} priority />
					</div>
				))}
			</div>
		),
		[firstImage]
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

		// if (res?.data.findIndex(q => q.product_id === params.id) === -1) {
		// 	const res = await addToCart({ user_id: userData?.id, product_id: data?.product_id })
		// 	messageHelper(res?.message)
		// 	return
		// }
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
						<Divider />
						{data?.variations.map(q => (
							<div key={q.id}>
								<div className={styles.variationContainer}>
									<span className={styles.label}>{capFrstLtr(q?.label)}:</span>
									<div className={styles.options}>
										{q?.value.map(w => (
											<motion.span
												style={
													selectedVariations[q.id] === w.id
														? {
																background: darkMode ? 'white' : 'black',
																color: darkMode ? 'black' : 'white'
														  }
														: {}
												}
												onClick={() => {
													setSelectedVariations(prevSelectedVariations => ({
														...prevSelectedVariations,
														[q.id]: w.id
													}))
												}}
												whileTap={scaleSize}
												key={w.id}>
												{w.value}
											</motion.span>
										))}
									</div>
								</div>
								<Divider />
							</div>
						))}
					</div>
					<div className={styles.addToCartContainer}>
						{/* <div className={styles.stockText}>Stocks: {data?.stock}</div> */}
						<div className={styles.addToCartButton}>
							<div className={styles.addToCart}>
								<motion.span whileTap={scaleSizeSm} onClick={() => setQty(qty => (qty > 1 ? qty - 1 : qty))}>
									<MinusOutlined />
								</motion.span>
								<span>{qty}</span>
								<motion.span whileTap={scaleSizeSm} onClick={() => setQty(qty => qty + 1)}>
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
			<Divider/>
			<LandingContent title="checkout other products" products={products} />
		</div>
	)
}

export default ProductDetails
