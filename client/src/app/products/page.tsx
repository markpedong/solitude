'use client'

import React, { CSSProperties, FC, useState } from 'react'
import styles from './styles.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, CloseOutlined, DownOutlined, FilterOutlined, RightOutlined, SmileOutlined, UpOutlined } from '@ant-design/icons'
import Product from '@/components/reusable/product'
import { Collapse, Divider, Dropdown, Flex, Pagination, Slider } from 'antd'
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
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <div className={styles.collapseLabel}>T-shirts</div>,
						children: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, temporibus?</div>
					},
					{
						key: '2',
						label: <div className={styles.collapseLabel}>Shorts</div>,
						children: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, temporibus?</div>
					},
					{
						key: '3',
						label: <div className={styles.collapseLabel}>Jeans</div>,
						children: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, temporibus?</div>
					},
					{
						key: '4',
						label: <div className={styles.collapseLabel}>Hoodie</div>,
						children: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, temporibus?</div>
					}
				]}
			/>
			<Divider />
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <div className={styles.header}>Price</div>,
						children: <Slider range defaultValue={[0, 999]} />
					}
				]}
			/>
			<Divider />
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <div className={styles.header}>Colors</div>,
						children: (
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
						)
					}
				]}
			/>
			<Divider />
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <div className={styles.header}>Size</div>,
						children: (
							<div className={styles.sizeVariationContainer}>
								<span>small</span>
								<span>medium</span>
								<span>large</span>
								<span>x-large</span>
								<span>xx-large</span>
								<span>3x-large</span>
								<span>4x-large</span>
							</div>
						)
					}
				]}
			/>
			<Divider />
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <span>Dress Style</span>,
						children: (
							<Collapse
								expandIconPosition="end"
								items={[
									{
										label: <span className={styles.collapseLabel}>Casual</span>,
										children: <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, rem.</div>
									},
									{
										label: <span className={styles.collapseLabel}>Formal</span>,
										children: <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, rem.</div>
									},
									{
										label: <span className={styles.collapseLabel}>Party</span>,
										children: <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, rem.</div>
									},
									{
										label: <span className={styles.collapseLabel}>Gym</span>,
										children: <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, rem.</div>
									}
								]}
							/>
						)
					}
				]}
			/>

			<motion.div whileTap={{ scale: 0.8 }} className={styles.applyButton}>
				Apply Filters
			</motion.div>
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
