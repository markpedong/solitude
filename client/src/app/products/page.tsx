'use client'

import React, { CSSProperties, FC, useState } from 'react'
import styles from './styles.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, CloseOutlined, DownOutlined, FilterOutlined, RightOutlined, SmileOutlined, UpOutlined } from '@ant-design/icons'
import Product from '@/components/reusable/product'
import { Divider, Dropdown, Flex, Pagination, Slider } from 'antd'
import { ModalForm } from '@ant-design/pro-components'
import { motion } from 'framer-motion'
import type { MenuProps, PaginationProps } from 'antd'

type Props = {}

const flexStyle: CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between'
}

const FILTER = {
	1: 'Most Popular',
	2: 'Top Selling',
	3: 'Relevance'
}

const Filter: FC = () => {
	return (
		<div className={styles.filterWrapper}>
			<Divider />
			<div className={styles.firstFilter}>
				<div>
					<span>T-shirts</span>
					<RightOutlined />
				</div>
				<div>
					<span>Shorts</span>
					<RightOutlined />
				</div>
				<div>
					<span>Hoodie</span>
					<RightOutlined />
				</div>
				<div>
					<span>Jeans</span>
					<RightOutlined />
				</div>
			</div>
			<Divider />
			<div className={styles.header} style={flexStyle}>
				<span>Price</span>
				<UpOutlined />
			</div>
			<Slider range defaultValue={[0, 999]} />
			<Divider />
			<div className={styles.header} style={flexStyle}>
				<span>Colors</span>
				<UpOutlined />
			</div>
			<div className={styles.colorContainer}>
				<span>
					<CheckOutlined />
				</span>
				<span>
					<CheckOutlined />
				</span>
				<span>
					<CheckOutlined />
				</span>
				<span>
					<CheckOutlined />
				</span>
				<span>
					<CheckOutlined />
				</span>
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
			<Divider />
			<div className={styles.header} style={flexStyle}>
				<span>Size</span>
				<UpOutlined />
			</div>
			<div className={styles.sizeVariationContainer}>
				<span>small</span>
				<span>medium</span>
				<span>large</span>
				<span>x-large</span>
				<span>xx-large</span>
				<span>3x-large</span>
				<span>4x-large</span>
			</div>
			<Divider />
			<div className={styles.header} style={{ ...flexStyle, paddingBottom: '1rem' }}>
				<span>Dress Style</span>
				<UpOutlined />
			</div>
			<div className={styles.firstFilter}>
				<div>
					<span>Casual</span>
					<RightOutlined />
				</div>
				<div>
					<span>Formal</span>
					<RightOutlined />
				</div>
				<div>
					<span>Party</span>
					<RightOutlined />
				</div>
				<div>
					<span>Gym</span>
					<RightOutlined />
				</div>
			</div>
			<div className={styles.applyButton}>Apply Filters</div>
		</div>
	)
}
const Products = (props: Props) => {
	const [sort, setSort] = useState(1)
	const [current, setCurrent] = useState(1)

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

	const onChange: PaginationProps['onChange'] = page => {
		console.log(page)
		setCurrent(page)
	}

	const renderFilter = () => {
		return (
			<ModalForm
				title={
					<div className={styles.header}>
						<span>Filters</span>
					</div>
				}
				submitter={false}
				trigger={
					<div className={styles.mobileFilter}>
						<FilterOutlined />
					</div>
				}
			>
				<Filter />
			</ModalForm>
		)
	}

	const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
		if (type === 'prev') {
			return (
				<motion.div whileTap={{ scale: 0.8 }} className={styles.arrowContainer}>
					<ArrowLeftOutlined />
					<span>Previous</span>
				</motion.div>
			)
		}
		if (type === 'next') {
			return (
				<motion.div whileTap={{ scale: 0.8 }} className={styles.arrowContainer}>
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
				<span>T-shirts</span>
			</div>
			<div className={styles.mainContainer}>
				<div className={styles.filterContainer}>
					<div className={styles.header}>
						<span>Filters</span>
						<FilterOutlined />
					</div>
					<Filter />
				</div>
				<div>
					<div className={styles.productHeader}>
						<span className={styles.header}>Casual</span>
						<div className={styles.showingContainer}>
							<span className={styles.showing}>Showing 1-10 of 100 Products</span>
							<div className={styles.sortContainer}>
								<span>Sort by:</span>

								<Dropdown menu={{ items }} placement="bottomCenter" trigger={['click']}>
									<Flex justify="center" gap={5}>
										<p>{FILTER[sort]}</p>
										<DownOutlined />
									</Flex>
								</Dropdown>
							</div>
							{renderFilter()}
						</div>
					</div>
					<div className={styles.productsWrapper}>
						<Product />
						<Product />
						<Product />
						<Product />
						<Product />
						<Product />
						<Product />
						<Product />
						<Product />
					</div>
					<Divider />
					<div className={styles.paginationContainer}>
						<Pagination total={500} itemRender={itemRender} showQuickJumper={false} showSizeChanger={false} size="small" onChange={onChange} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Products
