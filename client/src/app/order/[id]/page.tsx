'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Divider, Timeline, Tooltip } from 'antd'
import { OrderItem, getOrders } from '@/api'
import { useAppSelector } from '@/redux/store'
import { dateParser } from '@/constants/helper'
import Image from 'next/image'
import DeliveryInfo from '@/components/reusable/deliveryInfo'
import { FaStore } from 'react-icons/fa'

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
					<div className={styles.timeContainer}>
						<Timeline items={renderTimelineItems()} />
						<Divider />
						<span className={styles.deliveryHeader}>Delivery Address</span>
						<div className={styles.deliveryInfo}>{/* <span>{orderedData?}</span> */}</div>
						<DeliveryInfo data={orderedData?.delivery_info} />
					</div>
					<div className={styles.textContainer}>
						<div className={styles.sellerData}>
							<FaStore />
							<span>{orderedData?.seller_name}</span>
							<span>View Shop</span>
						</div>
						<div className={styles.orderContainer}>
							<Image className={styles.orderImage} src={orderedData?.image?.[0]} width={50} height={50} alt={orderedData?.product_name} />
							<div className={styles.detailsContainer}>
								<span className={styles.detailHeader}>{orderedData?.product_name}</span>
								<div>Variation: {orderedData?.variations?.map(q => `${q.label}:${q?.selected_value}, `)}</div>
								<span>Quantity: {orderedData?.quantity}</span>
								<div className={styles.priceContainer}>
									{!!!orderedData?.discount_price ? <span>₱{orderedData?.price}</span> : <span>₱{orderedData?.discount_price}</span>}
									{!!orderedData?.discount_price && <span>₱{orderedData?.price}</span>}
									{!!orderedData?.discount && <span>-{orderedData?.discount}%</span>}
								</div>
							</div>
						</div>
						<Divider />
						<div className={styles.orderTotal}>
							<span className={styles.deliveryHeader}>Order Total</span>
							<div className="mt-3">
								<span>Merchandise Total</span>
								<span>₱{orderedData?.price}</span>
							</div>
							<div>
								<span>Shipping Fee</span>
								<span>₱38</span>
							</div>
							<div>
								<span>
									<Tooltip title="Free Shipping Voucher applied">Shipping Discount Subtotal</Tooltip>
								</span>
								<span>₱38</span>
							</div>
							<div>
								<span>Order Total</span>
								<span>₱38</span>
							</div>
						</div>
						<div className={styles.reviewRateContainer}>
							<span>Rate Product</span>
							<span>Rate Seller</span>
							<span>Complete Order</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderedItem
