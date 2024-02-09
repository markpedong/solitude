import React from 'react'
import styles from './styles.module.scss'
import { ArrowRightOutlined, PercentageOutlined, RightOutlined } from '@ant-design/icons'
import { Divider, Input } from 'antd'
import classNames from 'classnames'
import Order from '@/components/cart/order'

type Props = {}

const CartPage = (props: Props) => {
	return (
		<div className={styles.cartWrapper}>
			<div className={styles.productCategory}>
				<span>Home</span>
				<RightOutlined />
				<span>Cart</span>
			</div>
			<div className={styles.header}>your cart</div>
			<div className={styles.mainContainer}>
				<div className={styles.orderContainer}>
					<Order />
					<Order />
					<Order divider={false} />
				</div>
				<div className={styles.orderSummaryContainer}>
					<div className={styles.header}>Order Summary</div>
					<div className={styles.subContent}>
						<span>Subtotal</span>
						<span>$565</span>
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
						<span>$467</span>
					</div>
					<div className={classNames(styles.subContent, styles.promoCode)}>
						<Input placeholder="Add promo Code" prefix={<PercentageOutlined />} />
						<div>Apply </div>
					</div>
					<div className={styles.checkout}>
						Go to Checkout <ArrowRightOutlined />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartPage
