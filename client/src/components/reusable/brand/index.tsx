'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { scaleSizeBig } from '@/constants'
import Image from 'next/image'
import { SellerData } from '@/api'
import styles from '../styles.module.scss'
import { useRouter } from 'next/navigation'
import { imgErrSrc } from '@/constants/antd'

type Props = {
	data: SellerData
}

const BrandItem = ({ data }: Props) => {
	const router = useRouter()

	return (
		<motion.div className={styles.brandItemContainer} whileHover={{ scale: 1.1 }}>
			<Image src={data?.avatar || imgErrSrc} height={100} width={100} alt="seller" />
			<div className="grid w-full">
				<span
					className={styles.brandItemTitle}
					onClick={() => router.push(`/brands/${data?.seller_id}`)}
					style={{ wordBreak: 'break-word' }}
				>
					{data?.seller_name}
				</span>
				<div className={styles.brandItemDesc}>
					<div className={styles.brandDesc}>
						<span>Followers:</span>
						<span>{data?.followers}</span>
					</div>
					<div className={styles.brandDesc}>
						<span>Ratings:</span>
						<span>{data?.rating}</span>
					</div>
					<div className={styles.brandDesc}>
						<span>Products:</span>
						<span>{data?.products}</span>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default BrandItem
