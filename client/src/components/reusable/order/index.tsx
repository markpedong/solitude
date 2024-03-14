import React, { FC } from 'react'
import styles from './styles.module.scss'
import { OrderItem } from '@/api'
import Image from 'next/image'
import { FaStore } from 'react-icons/fa6'
import { COLOR_STATUS, ORDER_STATUS } from '@/constants'
import { useRouter } from 'next/navigation'

type Props = {
	data: OrderItem
}

const Order: FC<Props> = ({ data }) => {
	const router = useRouter()
	return (
		<div className={styles.orderContainer}>
			<Image src={data?.image?.[0]} alt="order" width={1000} height={1000} />
			<div className={styles.orderDescription}>
				<div className={styles.orderHeader}>
					<span onClick={() => router.push(`/brands/${data?.seller_id}`)}>
						<FaStore />
						{data?.seller_name}
					</span>
				</div>
				<span className={styles.orderName} onClick={() => router.push(`/products/${data?.product_id}`)}>{data?.product_name}</span>
				<div>Variation: {data?.variations?.filter(q => !!q?.value).map(q => `${q.label}:${q?.value?.[0]?.value}, `)}</div>
				<span>x{data?.quantity}</span>
			</div>
			<div className={styles.extraWrapper}>
				<span className={styles.status} style={{color: COLOR_STATUS[data?.status]}}>{ORDER_STATUS[data?.status]}</span>
				<div className={styles.priceContainer}>
					<span>Order Total:</span>
					{!!!data?.discount_price ? <span className={styles.price}>₱{data?.price}</span> : <span className={styles.price}>₱{data?.discount_price}</span>}
				</div>
				<span className={styles.rateBtn} onClick={() => router.push(`/order/${data?.order_id}`)}>Show Details</span>
			</div>
		</div>
	)
}

export default Order
