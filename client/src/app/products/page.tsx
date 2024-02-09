import React from 'react'
import styles from './styles.module.scss'
import { DownOutlined, RightOutlined } from '@ant-design/icons'

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
				<div className={styles.productContainer}>
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
				</div>
			</div>
		</div>
	)
}

export default Products
