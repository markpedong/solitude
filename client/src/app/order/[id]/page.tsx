'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { FaCheckCircle } from 'react-icons/fa'
import { Timeline } from 'antd'
import { getOrders } from '@/api'
import { useAppSelector } from '@/redux/store'

const OrderedItem = () => {
	const { id: order_id } = useParams()
	const { userData } = useAppSelector(s => s.userData)
	const [orderedData, setOrderedData] = useState()

	const fetchOrderInfo = async () => {
		const res = await getOrders({ id: userData?.id, order_id })

		//@ts-ignore
		setOrderedData(res?.data)
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
						<Timeline
							items={[
								{
									children: `Order Created`,
									color: '#123123',
									dot: <FaCheckCircle className="size-6" />,
									key: '0'
								},
								{
									children: 'Pending',
									color: '#123123',
									dot: <FaCheckCircle className="size-6" />,
									key: '1'
								},
								{
									children: 'Shipping',
									dot: <FaCheckCircle className="size-6" />,
									key: '2'
								},
								{
									children: 'Out for Delivery',
									dot: <FaCheckCircle className="size-6" />,
									key: '3'
								},
								{
									children: 'Order Completed',
									color: 'rgba(20, 225, 62, 1)',
									dot: <FaCheckCircle className="size-6" />,
									key: '4'
								}
							]}
						/>
					</div>
					<div>2</div>
				</div>
			</div>
		</div>
	)
}

export default OrderedItem
