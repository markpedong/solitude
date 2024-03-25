'use client'

import { CheckOutlined } from '@ant-design/icons'
import { Divider, Image, Popconfirm, Rate } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'
import Product from './product'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { RatingItem, TProduct, deleteReview } from '@/api'
import { scaleSizeBig } from '@/constants'
import { IoTrashOutline } from 'react-icons/io5'
import { messageHelper } from '@/constants/antd'

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
	user?: boolean
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

export const ReviewComp: FC<ReviewProps> = ({ product, data, user }) => {
	const handleDeleteReviewItem = async () => {
		const res = await deleteReview({ review_id: data?.id })

		messageHelper(res)
	}

	console.log(data)
	return (
		<div className={styles.reviewContainer} style={product ? { maxWidth: '20rem', width: '100%' } : {}}>
			<div className="flex justify-between">
				<Rate value={data?.rating} disabled />
				{/* {user && (
					<Popconfirm title="Are you sure to delete this review item?" onConfirm={handleDeleteReviewItem}>
						<IoTrashOutline className="cursor-pointer" color="red" />
					</Popconfirm>
				)} */}
			</div>
			<div className={styles.nameContainer}>
				<span>{user ? data?.product_name : data?.name}</span>
				<CheckOutlined />
			</div>
			<div className="flex flex-col gap-3">
				{!!data?.description && <span className={styles.comment}>{data?.description}</span>}
				<div className="flex gap-3">{!!data?.images?.length && data?.images.map(q => <Image src={q} alt="review_image" width={50} height={50} />)}</div>
			</div>
		</div>
	)
}
