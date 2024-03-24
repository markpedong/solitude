'use client'

import { CheckOutlined } from '@ant-design/icons'
import { Divider, Rate } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'
import Product from './product'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { RatingItem, TProduct } from '@/api'
import { scaleSizeBig } from '@/constants'

type Props = {
	title: string
}

type LandingProps = {
	title: string
	products: TProduct[]
}

type ReviewProps = {
	product?: boolean
	data: RatingItem
}

export const PageHeader: FC<Props> = ({ title }) => {
	return <div className={styles.header}>{title}</div>
}

export const LandingContent: FC<LandingProps> = ({ title, products }) => {
	const router = useRouter()

	return (
		<div className={styles.newArrivalWrapper}>
			<PageHeader title={title} />
			<div className={styles.productContainer}>
				{products?.map(q => (
					<Product data={q} key={q?.product_id} />
				))}
			</div>
			<div className={styles.viewButtonContainer}>
				<motion.span className={styles.button} onClick={() => router.push('/products')} whileHover={scaleSizeBig}>
					View All
				</motion.span>
			</div>
			<Divider />
		</div>
	)
}

export const ReviewComp: FC<ReviewProps> = ({ product, data }) => {
	return (
		<div className={styles.reviewContainer} style={product ? { maxWidth: '20rem', width: '100%' } : {}}>
			<Rate value={data?.rating} disabled />
			<div className={styles.nameContainer}>
				<span>{data?.name}</span>
				<CheckOutlined />
			</div>
			{!!data?.description && <span className={styles.comment}>{data?.description}</span>}
		</div>
	)
}
