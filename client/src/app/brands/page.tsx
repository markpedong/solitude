import { getBrands } from '@/api'
import BrandItem from '@/components/reusable/brand'
import React from 'react'
import styles from '../styles.module.scss'
import { RightOutlined } from '@ant-design/icons'

const Page = async () => {
	const seller = await getBrands()

	return (
		<div className="max-w-6xl mx-auto py-10 ">
			<div className={styles.brandPageHeader}>Brands</div>
			<div className={styles.productCategory}>
				<span>Home</span>
				<RightOutlined />
				<span>Shop</span>
				<RightOutlined />
				<span>Brands</span>
			</div>
			<div className={styles.brandWrapper}>
				{seller?.data.map(q => (
					<BrandItem data={q} />
				))}
			</div>
		</div>
	)
}

export default Page
