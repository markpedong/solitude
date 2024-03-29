'use client'

import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Rate } from 'antd'
import Image from 'next/image'
import { TProduct } from '@/api'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { scaleSizeBig } from '@/constants'

type Props = {
	data: TProduct
}

const Product: FC<Props> = ({ data }) => {
	const router = useRouter()

	return (
		<motion.div className={styles.productContainer} whileHover={scaleSizeBig}>
			<div className={styles.imageContainer}>
				<Image src={data?.image?.[0] ?? ''} alt="sample" width={300} height={300} priority />
			</div>
			<div className={styles.productHeader} onClick={() => router.push(`/products/${data?.product_id}`)}>
				{data?.product_name}
			</div>
			<div className={styles.rateContainer}>
				<Rate value={data?.rating} disabled />
				<span className={styles.rate}>
					{data?.rating} /<span className="pl-1">5</span>
				</span>
			</div>
			<div className={styles.priceContainer}>
				{!!!data?.discount_price ? <span className={styles.price}>₱{data?.price}</span> : <span className={styles.price}>₱{data?.discount_price}</span>}
				{!!data?.discount_price && <span className={styles.price}>₱{data?.price}</span>}
				{!!data?.discount && <span className={styles.price}>-{data?.discount}%</span>}
			</div>
		</motion.div>
	)
}

export default Product
