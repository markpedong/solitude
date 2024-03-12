'use client'

import { InfoItem, getDeliveryInfo } from '@/api'
import isAuth from '@/components/isAuth'
import DeliveryInfo from '@/components/reusable/deliveryInfo'
import Order from '@/components/reusable/order'
import { useAppSelector } from '@/redux/store'
import { ArrowRightOutlined, PercentageOutlined, RightOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-components'
import { Divider, Input, Radio } from 'antd'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { scaleSize } from '@/constants'

const Content = () => {
	const {
		userData: { userCart, id }
	} = useAppSelector(s => s.userData)
	const [deliveryInfo, setDeliveryInfo] = useState<InfoItem[]>([])
	const [infoID, setInfoID] = useState('')

	const fetchDeliveryDetails = async () => {
		const res = await getDeliveryInfo({ user_id: id })

		setDeliveryInfo(res?.data)
		setInfoID(res?.data.find(q => q?.address_type === 1)?.id)
	}

	const selectAddress = () => {
		return (
			<ModalForm
				title={<span className={styles.header}>Select Address</span>}
				width={600}
				trigger={<RightOutlined />}
				onFinish={async () => true}
				submitter={{
					render: props => (
						<div className={styles.footerBtn}>
							<motion.span whileTap={scaleSize} className={styles.submitBtn} onClick={() => props?.submit()}>
								Submit
							</motion.span>
						</div>
					)
				}}>
				<div className={styles.addressWrapper}>
					<div className={styles.addressDetails}>
						{deliveryInfo?.map(q => (
							<DeliveryInfo key={q?.id} data={q} style={{ backgroundColor: infoID === q?.id ? 'rgba(0, 0, 0, 0.05)' : '' }} />
						))}
					</div>
					<Radio.Group onChange={e => setInfoID(e.target.value)} value={infoID}>
						<div className={styles.selection}>
							{deliveryInfo?.map(q => (
								<Radio key={q?.id} value={q?.id} />
							))}
						</div>
					</Radio.Group>
				</div>
			</ModalForm>
		)
	}

	useEffect(() => {
		fetchDeliveryDetails()
	}, [id])

	return (
		<div className={styles.cartWrapper}>
			<div className={styles.productCategory}>
				<span>Home</span>
				<RightOutlined />
				<span>Checkout</span>
			</div>
			<div className={styles.header}>your cart</div>
			<div className={styles.mainWrapper}>
				<div className={styles.cartContainer}>
					{userCart &&
						(userCart?.length > 1
							? userCart.slice(0, -1).map(q => <Order data={q} key={q?.checkout_id} />)
							: userCart.map(q => <Order data={q} key={q?.checkout_id} divider={false} />))}
					{userCart?.length > 1 && <Order data={userCart?.findLast(q => q)} divider={false} />}
				</div>
				<div className={styles.orderSummaryContainer}>
					<div className={styles.header}>Order Summary</div>
					<div className="flex justify-between items-center">
						<DeliveryInfo data={deliveryInfo?.find(q => q?.id === infoID)} />
						{selectAddress()}
					</div>
					<Divider />
					<div className={styles.subContent}>
						<span>Subtotal</span>
						<span>₱{userCart?.reduce((acc, curr) => acc + curr.price, 0)}</span>
					</div>
					{/* <div className={classNames(styles.subContent, styles.discount)}>
						<span>Discount (-20%)</span>
						<span>- $113</span>
					</div>
					<div className={styles.subContent}>
						<span>Delivery Fee</span>
						<span>$15</span>
					</div> */}
					<Divider />
					<div className={classNames(styles.subContent, styles.total)}>
						<span>Total</span>
						<span>₱{userCart?.reduce((acc, curr) => acc + curr.price, 0)}</span>
					</div>
					<div className={classNames(styles.subContent, styles.promoCode)}>
						<Input placeholder="Add promo Code" prefix={<PercentageOutlined />} />
						<div>Apply </div>
					</div>
					<div className={styles.checkout}>
						Checkout <ArrowRightOutlined />
					</div>
				</div>
			</div>
		</div>
	)
}

export default isAuth(Content)
