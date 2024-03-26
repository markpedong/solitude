import React, { FC, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { ControlOutlined, DownOutlined } from '@ant-design/icons'
import { PageHeader, ReviewComp } from '@/components/reusable'
import Product from '@/components/reusable/product'
import { Dropdown, Flex, Result } from 'antd'
import type { MenuProps } from 'antd'
import { FILTER } from '@/constants'
import { motion } from 'framer-motion'
import { RatingItem, TProduct } from '@/api'

type RatingProps = { products: TProduct[]; curr: string; rating: RatingItem[] }

const Rating: FC<RatingProps> = ({ products, curr, rating }) => {
	const [sort, setSort] = useState(1)
	const handleClickSort = e => setSort(e.key)
	// const items: MenuProps['items'] = [
	// 	{
	// 		key: 1,
	// 		label: <span>Most Popular</span>,
	// 		onClick: handleClickSort
	// 	},
	// 	{
	// 		key: 2,
	// 		label: <span>Top Selling</span>,
	// 		onClick: handleClickSort
	// 	},
	// 	{
	// 		key: 3,
	// 		label: <span>Relevance</span>,
	// 		onClick: handleClickSort
	// 	}
	// ]

	const reviewComponent = useMemo(
		() => (
			<div className={styles.reviewWrapper}>
				{rating?.map(q => (
					<ReviewComp data={q} product={true} key={q?.id} />
				))}
			</div>
		),
		[]
	)

	return (
		<>
			{!!rating?.length ? (
				<div className={styles.ratingWrapper}>
					<div className={styles.headerContainer}>
						<div>
							<span>All Reviews</span>
							{/* <span>{'(451)'}</span> */}
						</div>
						{/* <div>
							<ControlOutlined className={styles.filter} />
							<Dropdown className={styles.latest} menu={{ items }} trigger={['click']} placement="bottom">
								<Flex justify="center" gap={5}>
									<p>{FILTER[sort]}</p>
									<DownOutlined />
								</Flex>
							</Dropdown>
							<span className={styles.review}>Write a Review</span>
						</div> */}
					</div>
					{reviewComponent}
					{/* <motion.div whileTap={{ scale: 0.9 }} className={styles.loadMoreReview}>
						Load more Review
					</motion.div> */}
					<PageHeader title="you might also like" />
					<div className={styles.productWrapper}>
						{products
							.slice(0, 10)
							.filter(q => q.product_id !== curr)
							.map(q => (
								<Product data={q} key={q?.product_id} />
							))}
					</div>
				</div>
			) : (
				<Result
					status="404"
					style={{
						height: '100%',
						background: '#fff'
					}}
					title="This product doesn't have any reviews, want to add review? Click here!"
					subTitle="Submitting review for products will be helpful to reach other customers!"
				/>
			)}
		</>
	)
}

export default Rating
