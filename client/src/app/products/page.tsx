'use client'

import React from 'react'
import styles from './styles.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined, DownOutlined, FilterOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import Product from '@/components/reusable/product'
import { Divider, Pagination, Slider } from 'antd'

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
				<div className={styles.filterContainer}>
					<div className={styles.header}>
						<span>Filters</span>
						<FilterOutlined />
					</div>
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
					<div className={styles.header}>
						<span>Price</span>
						<UpOutlined />
					</div>
					<Slider range defaultValue={[0, 999]} />
					<Divider />
					<div className={styles.header}>
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
					<div className={styles.header}>
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
					<div className={styles.header}>
						<span>Dress Style</span>
						<UpOutlined />
					</div>
					<div className={styles.firstFilter} style={{ paddingTop: '1rem' }}>
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
							<div className={styles.mobileFilter}>
								<FilterOutlined />
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
