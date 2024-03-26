import React, { FC } from 'react'
import styles from './styles.module.scss'
import { TProduct } from '@/api'
import Product from '@/components/reusable/product'

type Props = {
	products: TProduct[]
}

const Products: FC<Props> = ({ products }) => {
	return (
		<div className={styles.productListWrapper}>
			{products?.map(q => (
				<Product data={q} key={q?.product_id} />
			))}
		</div>
	)
}

export default Products
