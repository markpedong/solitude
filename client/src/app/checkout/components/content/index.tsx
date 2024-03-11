'use client'

import isAuth from '@/components/isAuth'
import { useAppSelector } from '@/redux/store'
import { ArrowRightOutlined, PercentageOutlined, RightOutlined } from '@ant-design/icons'
import { Divider, Input } from 'antd'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { CartItem, InfoItem, checkCart, getDeliveryInfo } from '@/api'
import Order from '@/components/reusable/order'
import { ModalForm } from '@ant-design/pro-components'
import Address from '@/app/account/components/address'

const Content = () => {
	const {
		userData: { userCart, id }
	} = useAppSelector(s => s.userData)
	const [deliveryInfo, setDeliveryInfo] = useState<InfoItem[]>([])
	const first = deliveryInfo?.[0]
	const fetchDeliveryDetails = async () => {
		const res = await getDeliveryInfo({ user_id: id })

		setDeliveryInfo(res?.data)
	}

	const selectAddress = () => {
		return <ModalForm trigger={<span>test</span>}></ModalForm>
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
					<div className={styles.addressWrapper}>{first?.first_name}</div>
					<Divider />
					<div className={styles.subContent}>
						<span>Subtotal</span>
						<span>₱{userCart?.reduce((acc, curr) => acc + curr.price, 0)}</span>
					</div>
					<div className={classNames(styles.subContent, styles.discount)}>
						<span>Discount (-20%)</span>
						<span>- $113</span>
					</div>
					<div className={styles.subContent}>
						<span>Delivery Fee</span>
						<span>$15</span>
					</div>
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
