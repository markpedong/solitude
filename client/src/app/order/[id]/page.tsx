'use client'

import { OrderResponse, getOrdersByID } from '@/api'
import DeliveryInfo from '@/components/reusable/deliveryInfo'
import { dateParser } from '@/constants/helper'
import { Divider, Timeline } from 'antd'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MainContent from './components/mainContent'
import RateProducts from './components/rateProducts'
import styles from './styles.module.scss'
import RateSeller from './components/rateSeller'

const OrderedItem = () => {
	const { id: group_id } = useParams()
	const [orderState, setOrderState] = useState(1)
	const [orderedData, setOrderedData] = useState<OrderResponse>()
	const status = orderedData?.time

	const renderTimelineItems = () =>
		[
			{
				children: <span className={styles.timelineTitle}>Order Created at {dateParser(status?.created_at)}</span>,
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
				children: <span className={styles.timelineTitle}>Order Delivered at {dateParser(status?.delivered_at)}</span>,
				color: 'rgba(20, 225, 62, 1)',
				key: 5
			}
		].filter(q => q.key <= orderedData?.status)

	const fetchOrderInfo = async () => {
		const res = await getOrdersByID({ group_id })

		setOrderedData(res?.data)
	}

	useEffect(() => {
		fetchOrderInfo()
	}, [orderState])

	return (
		<>
			<div className="max-w-6xl mx-auto my-10 px-5">
				<div className={styles.orderHeader}>Order Details</div>
				<div className={styles.detailsWrapper}>
					<div className={styles.timeContainer}>
						<Timeline items={renderTimelineItems()} />
						<Divider />
						<span className={styles.deliveryHeader}>Delivery Address</span>
						<div className={styles.deliveryInfo}>{/* <span>{orderedData?}</span> */}</div>
						<DeliveryInfo data={orderedData?.address} />
					</div>
					{orderState === 1 && <MainContent data={orderedData} s={setOrderState} />}
					{orderState === 2 && <RateProducts products={orderedData?.products?.flatMap(q => q?.products)} s={setOrderState} />}
					{orderState === 3 && <RateSeller data={orderedData} s={setOrderState} />}
				</div>
			</div>
		</>
	)
}

export default OrderedItem
