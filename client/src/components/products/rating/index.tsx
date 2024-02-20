import React, { FC, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { ControlOutlined, DownOutlined } from '@ant-design/icons'
import { PageHeader, ReviewComp } from '@/components/reusable'
import Product from '@/components/reusable/product'
import { Dropdown, Flex } from 'antd'
import type { MenuProps } from 'antd'
import { FILTER } from '@/constants'
import { motion } from 'framer-motion'

type Props = {}

const Rating: FC = (props: Props) => {
	const [sort, setSort] = useState(1)
	const handleClickSort = e => setSort(e.key)

	const items: MenuProps['items'] = [
		{
			key: 1,
			label: <span>Most Popular</span>,
			onClick: handleClickSort
		},
		{
			key: 2,
			label: <span>Top Selling</span>,
			onClick: handleClickSort
		},
		{
			key: 3,
			label: <span>Relevance</span>,
			onClick: handleClickSort
		}
	]

	const reviewComponent = useMemo(
		() => (
			<div className={styles.reviewWrapper}>
				<ReviewComp product={true} />
				<ReviewComp product={true} />
				<ReviewComp product={true} />
				<ReviewComp product={true} />
				<ReviewComp product={true} />
				<ReviewComp product={true} />
			</div>
		),
		[]
	)

	return (
		<div className={styles.ratingWrapper}>
			<div className={styles.headerContainer}>
				<div>
					<span>All Reviews</span>
					<span>{'(451)'}</span>
				</div>
				<div>
					<ControlOutlined className={styles.filter} />
					<Dropdown className={styles.latest} menu={{ items }} trigger={['click']} placement="bottomCenter">
						<Flex justify="center" gap={5}>
							<p>{FILTER[sort]}</p>
							<DownOutlined />
						</Flex>
					</Dropdown>
					<span className={styles.review}>Write a Review</span>
				</div>
			</div>
			{reviewComponent}
			<motion.div whileTap={{ scale: 0.9 }} className={styles.loadMoreReview}>
				Load more Review
			</motion.div>
			<PageHeader title="you might also like" />
			<div className={styles.productWrapper}>
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
			</div>
		</div>
	)
}

export default Rating
