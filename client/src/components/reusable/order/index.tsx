import React, { FC } from 'react'
import styles from './styles.module.scss'
import { OrderItem } from '@/api'
import Image from 'next/image'

type Props = {
	data: OrderItem
}

const Order: FC<Props> = ({ data }) => {
	return (
		<div className={styles.orderContainer}>
			<Image src={data?.image?.[0]} alt="order" width={1000} height={1000} />
			<div className={styles.orderDescription}>
				<span>{data?.product_name}</span>
				<div>Variation: {data?.variations?.filter(q => !!q?.value).map(q => `${q.label}:${q?.value?.[0]?.value}, `)}</div>
				<span>x{data?.quantity}</span>
			</div>
			<div className={styles.priceContainer}>
				{!!!data?.discount_price ? <span>₱{data?.price}</span> : <span>₱{data?.discount_price}</span>}
				{!!data?.discount_price && <span>₱{data?.price}</span>}
				{!!data?.discount && <span>-{data?.discount}%</span>}
			</div>
		</div>
	)
}

export default Order
