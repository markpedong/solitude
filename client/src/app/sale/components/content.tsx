import { TProduct } from '@/api'
import Product from '@/components/reusable/product'
import React, { FC } from 'react'
import styles from './styles.module.scss'

type Props = {
	products: TProduct[]
}

const Content: FC<Props> = ({ products }) => {
	return (
		<div className={styles.contentWrapper}>
			{products?.map(q => (
				<Product data={q} />
			))}
		</div>
	)
}

export default Content
