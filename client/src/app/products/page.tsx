import React from 'react'
import styles from './styles.module.scss'
import { RightOutlined } from '@ant-design/icons'

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
		</div>
	)
}

export default Products
