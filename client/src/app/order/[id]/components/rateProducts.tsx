import { CartItem } from '@/api'
import React, { FC, SetStateAction } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from '../styles.module.scss'

type Props = {
	products: CartItem[]
	s: React.Dispatch<SetStateAction<number>>
}

const RateProducts: FC<Props> = ({ products: q, s }) => {
	console.log('@@@@', q)
	return (
		<div>
			<IoMdArrowRoundBack onClick={() => s(1)} />
			<div className={styles.productWrapper}>
				{q?.map((w, i) => (
					<div className={styles.productContainer} key={i}>
						{w.product_name}
					</div>
				))}
			</div>
		</div>
	)
}

export default RateProducts
