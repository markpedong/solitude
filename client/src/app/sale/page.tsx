import { getProducts } from '@/api'
import React from 'react'
import Content from './components/content'
import styles from './components/styles.module.scss'
import { RightOutlined } from '@ant-design/icons'

const SalePage = async () => {
	const res = await getProducts({})
	const filteredProducts = res?.data.filter(q => !!q.discount)

	return (
		<div className='max-w-6xl mx-auto py-10'>
			<div className={styles.salePageHeader}>ON SALE</div>
            <div className={styles.productCategory}>
				<span>Home</span>
				<RightOutlined />
				<span>Shop</span>
				<RightOutlined />
				<span>Sale</span>
			</div>
			<Content products={filteredProducts} />
		</div>
	)
}

export default SalePage
