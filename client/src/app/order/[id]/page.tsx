'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { Divider, Flex, Rate, Spin, Timeline, Tooltip, UploadFile } from 'antd'
import { OrderResponse, getOrdersByID, uploadImages } from '@/api'
import { useAppSelector } from '@/redux/store'
import { dateParser } from '@/constants/helper'
import Image from 'next/image'
import DeliveryInfo from '@/components/reusable/deliveryInfo'
import { FaStore } from 'react-icons/fa'
import { ModalForm, ProFormInstance, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components'
import { MODAL_FORM_PROPS } from '@/constants'

const OrderedItem = () => {
	const formRef = useRef<ProFormInstance>()
	const { id: group_id } = useParams()
	const { userData } = useAppSelector(s => s.userData)
	const [orderedData, setOrderedData] = useState<OrderResponse>()
	const [uploadedImages, setUploadedImages] = useState<UploadFile<any>[]>([])
	const [uploading, setUploading] = useState(false)
	const status = orderedData?.time
	const total = orderedData?.products?.flatMap(q => q.products).reduce((acc, cur) => acc + cur.price, 0)

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

		console.log(orderedData)
	}

	const reviewProd = () => {
		return (
			<ModalForm
				{...MODAL_FORM_PROPS}
				formRef={formRef}
				labelCol={{ flex: '75px' }}
				trigger={<span>Rate Product</span>}
				title={<span className={styles.reviewProdTitle}>Rate Product</span>}
				onFinish={async params => {
					console.log(params)
				}}
				onOpenChange={visible => {
					if (!visible) {
						formRef?.current.resetFields()
					}
				}}
			>
				<ProFormText label="Images">
					<Flex className={styles.galleryContainer}>
						{uploading ? (
							<Spin />
						) : (
							<ProFormUploadButton
								name="upload"
								title="UPLOAD YOUR IMAGE"
								fieldProps={{
									name: 'files',
									listType: 'picture-card',
									accept: 'image/*',
									multiple: true,
									fileList: uploadedImages,
									action: async e => {
										setUploading(true)
										setUploadedImages([])

										try {
											const res = await uploadImages(e)
											setUploadedImages(state => [...state, res.data])

											return ''
										} finally {
											setUploading(false)
										}
									}
								}}
							/>
						)}
					</Flex>
				</ProFormText>
				<ProFormText label="Rating" name="rating">
					<Rate allowHalf defaultValue={2.5} onChange={e => e} />
				</ProFormText>
				<ProFormText label="Title" name="title" />
				<ProFormTextArea
					label="Description"
					name="description"
					fieldProps={{
						autoSize: { minRows: 3, maxRows: 5 }
					}}
				/>
			</ModalForm>
		)
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
						<DeliveryInfo data={orderedData?.address} />
					</div>
					<div className={styles.textContainer}>
						{orderedData?.products?.map(q => (
							<div className="pb-6" key={q?.seller_id}>
								<div className={styles.sellerData}>
									<FaStore />
									<span>{q?.seller_name}</span>
									<span>View Shop</span>
								</div>
								{q?.products.map((w, i) => (
									<div className={styles.orderContainer} key={i}>
										<Image className={styles.orderImage} src={w?.image} width={50} height={50} alt={w?.product_name} />
										<div className={styles.detailsContainer}>
											<span className={styles.detailHeader}>{w?.product_name}</span>
											<div>Variation: {w?.variations?.map(e => `${e.label}:${e?.value}, `)}</div>
											<span>Quantity: {w?.quantity}</span>
											<div className={styles.priceContainer}>
												{!!!w?.discount_price ? <span>₱{w?.price}</span> : <span>₱{w?.discount_price}</span>}
												{!!w?.discount_price && <span>₱{w?.price}</span>}
												{!!w?.discount && <span>-{w?.discount}%</span>}
											</div>
										</div>
									</div>
								))}
							</div>
						))}
						<Divider />
						<div className={styles.orderTotal}>
							<span className={styles.deliveryHeader}>Order Total</span>
							<div className="mt-3">
								<span>Merchandise Total</span>
								<span>₱{total}</span>
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
								<span>₱{total}</span>
							</div>
						</div>
						<div className={styles.reviewRateContainer}>
							{reviewProd()}
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
