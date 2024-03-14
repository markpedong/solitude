'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Timeline } from 'antd'
import { OrderItem, getOrders } from '@/api'
import { useAppSelector } from '@/redux/store'
import { dateParser } from '@/constants/helper'
import Image from 'next/image'

const OrderedItem = () => {
	const { id: order_id } = useParams()
	const { userData } = useAppSelector(s => s.userData)
	const [orderedData, setOrderedData] = useState<OrderItem>()

	const renderTimelineItems = () =>
		[
			{
				children: <span className={styles.timelineTitle}>Order Created at {dateParser(orderedData?.created_at)}</span>,
				color: '#123123',
				key: 1
			},
			{
				children: <span className={styles.timelineTitle}>Pending</span>,
				color: '#123123',
				key: 2
			},
			{
				children: <span className={styles.timelineTitle}>Shipping</span>,
				key: 3
			},
			{
				children: <span className={styles.timelineTitle}>Out for Delivery</span>,
				key: 4
			},
			{
				children: <span className={styles.timelineTitle}>Order Delivered at {dateParser(orderedData?.delivered_at)}</span>,
				color: 'rgba(20, 225, 62, 1)',
				key: 5
			}
		].filter(q => q.key <= orderedData?.status)

	const fetchOrderInfo = async () => {
		const res = await getOrders({ id: userData?.id, order_id })

		setOrderedData(res?.data as OrderItem)
	}

	useEffect(() => {
		fetchOrderInfo()
	}, [])

	return (
		<div className="max-w-6xl mx-auto my-10 px-5">
			<div>
				<div className={styles.orderHeader}>Order Details</div>
				<div className={styles.detailsWrapper}>
					<div>
						<Timeline items={renderTimelineItems()} />
					</div>
					<div>
						<Image className={styles.orderImage} src={orderedData?.image?.[0]} width={50} height={50} alt={orderedData?.product_name}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderedItem
