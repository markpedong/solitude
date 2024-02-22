'use client'

import Image from 'next/image'
import { FC } from 'react'
import styles from './styles.module.scss'

type Props = {}

const Orders: FC<Props> = () => {
	return (
		<div className={styles.orderWrapper}>
			{/* {new Array(5).fill('').map(() => (
				<div className={styles.orderContainer}>
					<Image src="/assets/pen.png" alt="order" width={1000} height={1000} />
					<div className={styles.orderDescription}>
						<span>Cat Litter Box With Scoop Kitten Litter Box Cat Toilet</span>
						<span>Variation: Green, L: {`[48X40X14CM]`}</span>
						<span>x1</span>
					</div>
					<span>₱459</span>
				</div>
			))} */}
		</div>
	)
}

export default Orders
