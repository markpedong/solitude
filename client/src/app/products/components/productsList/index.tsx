'use client'

import Product from '@/components/reusable/product'
import { FILTER, scaleSize } from '@/constants'
import { ArrowLeftOutlined, ArrowRightOutlined, DownOutlined, FilterOutlined, RightOutlined } from '@ant-design/icons'
import { Divider, Dropdown, Flex, Pagination } from 'antd'
import Filter from '../filter'
import styles from './styles.module.scss'
import type { MenuProps, PaginationProps } from 'antd'
import { FC, useState } from 'react'
import { ModalForm } from '@ant-design/pro-components'
import { motion } from 'framer-motion'
import { TProduct } from '@/api'
import classNames from 'classnames'

const ProductList: FC<{ data: TProduct[] }> = ({ data }) => {
	const [sort, setSort] = useState(1)
	const [current, setCurrent] = useState(1)
	const min = Math.min(...data.map(item => item.price))
	const max = Math.max(...data.map(item => item.price))

	const handleClickSort = e => setSort(e.key)

	const items: MenuProps['items'] = [
		{
			key: 1,
			label: <span className={styles.header}>Most Popular</span>,
			onClick: handleClickSort
		},
		{
			key: 2,
			label: <span className={styles.header}>Top Selling</span>,
			onClick: handleClickSort
		},
		{
			key: 3,
			label: <span className={styles.header}>Relevance</span>,
			onClick: handleClickSort
		}
	]

	// const renderFilter = () => {
	// 	return (
	// 		<ModalForm
	// 			title={
	// 				<div className={styles.header}>
	// 					<span>Filters</span>
	// 				</div>
	// 			}
	// 			submitter={false}
	// 			trigger={
	// 				<div className={styles.mobileFilter}>
	// 					<FilterOutlined />
	// 				</div>
	// 			}
	// 		>
	// 			<Filter />
	// 		</ModalForm>
	// 	)
	// }

	const onChange: PaginationProps['onChange'] = page => {
		setCurrent(page)
	}

	const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
		if (type === 'prev') {
			return (
				<motion.div whileTap={scaleSize} className={styles.arrowContainer}>
					<ArrowLeftOutlined />
					<span>Previous</span>
				</motion.div>
			)
		}
		if (type === 'next') {
			return (
				<motion.div whileTap={scaleSize} className={styles.arrowContainer}>
					<span>Next</span>
					<ArrowRightOutlined />
				</motion.div>
			)
		}
		return originalElement
	}

	return (
		<div className={styles.productWrapper}>
			<div className={styles.productCategory}>
				<span>Home</span>
				<RightOutlined />
				<span>Shop</span>
				<RightOutlined />
				<span>Products</span>
			</div>
			<div className={styles.mainContainer}>
				<div className={styles.filterContainer}>
					<div className={classNames(styles.header, 'flex justify-between')}>
						<span>Filters</span>
						<FilterOutlined />
					</div>
					<Filter max={max} min={min} />
				</div>
				<div>
					<div className={styles.productHeader}>
						<span className={styles.header}>Products</span>
						<div className={styles.showingContainer}>
							<span className={styles.showing}>Showing {data?.length} Products</span>
							<div className={styles.sortContainer}>
								<span>Sort by:</span>

								<Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
									<Flex justify="center" gap={5}>
										<p>{FILTER[sort]}</p>
										<DownOutlined />
									</Flex>
								</Dropdown>
							</div>
							{/* {renderFilter()} */}
						</div>
					</div>
					<div className={styles.productsWrapper}>
						{data?.map(q => (
							<Product data={q} key={q?.product_id} />
						))}
					</div>
					<Divider />
					{data?.length > 30 && (
						<div className={styles.paginationContainer}>
							<Pagination total={data?.length} itemRender={itemRender} showQuickJumper={false} size="small" onChange={onChange} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductList
