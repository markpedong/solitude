'use client'

import React from 'react'
import styles from './styles.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined, DownOutlined, RightOutlined } from '@ant-design/icons'
import Product from '@/components/reusable/product'
import { Divider, Pagination } from 'antd'

type Props = {}

const Products = (props: Props) => {
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
				<div className={styles.filterContainer}>1</div>
				<div>
					<div className={styles.productHeader}>
						<span className={styles.header}>Casual</span>
						<div className={styles.showingContainer}>
							<span>Showing 1-10 of 100 Products</span>
							<div className={styles.sortContainer}>
								<span>Sort by:</span>
								<p>Most Popular</p>
								<DownOutlined />
							</div>
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
						<div className={styles.arrowContainer}>
							<ArrowLeftOutlined />
							<span>Previous</span>
						</div>
						<div>
							<Pagination total={500} showQuickJumper={false} showSizeChanger={false} size="small" />
						</div>
						<div className={styles.arrowContainer}>
							<span>Next</span>
							<ArrowRightOutlined />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Products
