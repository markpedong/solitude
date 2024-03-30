'use client'

import { InfoItem, addPaymentIntent, checkout, getDeliveryInfo, stripeConfig } from '@/api'
import isAuth from '@/components/isAuth'
import DeliveryInfo from '@/components/reusable/deliveryInfo'
import Cart from '@/components/reusable/cart'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { ArrowRightOutlined, PercentageOutlined, RightOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-components'
import { Divider, Input, Radio, message } from 'antd'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { scaleSize } from '@/constants'
import { messageHelper } from '@/constants/antd'
import { usePathname, useRouter } from 'next/navigation'
import { numComma } from '@/constants/helper'
import { Stripe, StripeElements, loadStripe } from '@stripe/stripe-js'
import { setCart } from '@/redux/features/userSlice'

const Content = () => {
	const router = useRouter()
	const {
		userData: { userCart, id }
	} = useAppSelector(s => s.userData)
	const products = userCart?.flatMap(q => q.products)
	const discount = products?.reduce((acc, cur) => acc + cur?.discount, 0)
	const discountPrice = products?.reduce((acc, cur) => acc + cur?.discount_price, 0)
	const [deliveryInfo, setDeliveryInfo] = useState<InfoItem[]>([])
	const [infoID, setInfoID] = useState('')
	const [paymentMethod, setPaymentMethod] = useState(1)
	const [paymentState, setPaymentState] = useState(1)
	const [stripe, setStripe] = useState<Stripe>()
	const [stripeElements, setStripeElements] = useState<StripeElements>()
	const pathname = usePathname()
	const dispatch = useAppDispatch()

	const fetchDeliveryDetails = async () => {
		const res = await getDeliveryInfo({ user_id: id })
		const data = res?.data
		let idToUse

		setDeliveryInfo(data ?? [])

		if (data) {
			const hasAddressType1 = data.some(q => q?.address_type === 1)
			const addressType1Item = data.find(q => q?.address_type === 1)

			idToUse = hasAddressType1 ? addressType1Item?.id : data[0]?.id
		}

		setInfoID(idToUse)
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
				}}
			>
				<div className={styles.addressWrapper}>
					<div className={styles.addressDetails}>
						{deliveryInfo?.map(q => (
							<DeliveryInfo
								key={q?.id}
								data={q}
								style={{ backgroundColor: infoID === q?.id ? 'rgba(0, 0, 0, 0.05)' : '' }}
							/>
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

	const checkoutCOD = async () => {
		if (!!!deliveryInfo?.length) {
			message.error('add address to checkout')
			return
		}

		const res = await checkout({
			user_id: id,
			delivery_id: infoID,
			payment_method: paymentMethod
		})

		if (!res?.success) {
			messageHelper(res)
			return
		}

		messageHelper(res)
		dispatch(setCart([]))
		router.push('/account')
	}

	const handleCancelPayment = () => {
		const paymentElement = stripe.elements().getElement('payment')
		paymentElement?.unmount()
		setPaymentState(1)
	}

	const handleConfirmPayment = async () => {
		const res = await stripe.confirmPayment({
			elements: stripeElements,
			redirect: 'if_required'
		})

		if (res?.error) {
			const messages = document.getElementById('error-messages')
			messages.innerText = res?.error.message
			return
		}

		// after success, save to database the XXXX
		checkoutCOD()
	}

	const checkOutBank = async () => {
		setPaymentState(2)
		const config = await stripeConfig()
		const stripe = await loadStripe(config?.data)
		setStripe(stripe)

		const w = await addPaymentIntent({
			total_amount: products?.reduce((acc, curr) => acc + curr.price, 0)
		})
		const elements = stripe?.elements({ clientSecret: w?.data })
		const paymentElement = elements?.create('payment')

		setStripeElements(elements)
		paymentElement?.mount('#payment-element')
	}

	useEffect(() => {
		fetchDeliveryDetails()
	}, [id])

	useEffect(() => {
		!!!userCart?.length && pathname !== '/checkout' && router.push('/products')
	}, [userCart?.length])

	return (
		!!userCart?.length && (
			<div className={styles.cartWrapper}>
				<div className={styles.productCategory}>
					<span>Home</span>
					<RightOutlined />
					<span>Checkout</span>
				</div>
				<div className={styles.header}>your cart</div>
				<div className={styles.mainWrapper}>
					<div className={styles.cartContainer}>
						{userCart?.map(q => (
							<div key={q?.seller_id}>
								<div className={styles.sellerName}>{q?.seller_name}</div>
								{q.products &&
									(q.products?.length > 1
										? q.products.slice(0, -1).map(q => <Cart data={q} key={q?.checkout_id} />)
										: q.products.map(q => <Cart data={q} key={q?.checkout_id} divider={false} />))}
								{q.products?.length > 1 && <Cart data={q.products?.findLast(q => q)} divider={false} />}
							</div>
						))}
					</div>
					<div className={styles.orderSummaryContainer}>
						<div className={styles.header}>{paymentState === 1 ? 'Order Summary' : 'Card Payment'}</div>
						{paymentState === 1 && (
							<>
								{!!deliveryInfo?.length && (
									<div className="flex justify-between items-center">
										<DeliveryInfo data={deliveryInfo?.find(q => q?.id === infoID)} />
										{selectAddress()}
									</div>
								)}
								{!!!deliveryInfo?.length && (
									<motion.div
										whileTap={scaleSize}
										className={styles.addInfoBtn}
										onClick={() => router.push('/account')}
									>
										Add Address
									</motion.div>
								)}
								<Divider />
								<div className={classNames(styles.paymentMethod)}>
									<span>Payment Method</span>
									<Radio.Group value={paymentMethod} onChange={e => setPaymentMethod(e?.target.value)}>
										<Radio value={1}>COD</Radio>
										<Radio value={2}>Bank</Radio>
										<Radio value={3}>GCash</Radio>
									</Radio.Group>
								</div>
								<Divider />
								<div className={styles.subContent}>
									<span>Subtotal</span>
									<span>₱{numComma(products?.reduce((acc, curr) => acc + curr.price, 0))}</span>
								</div>
								<div className={classNames(styles.subContent, styles.discount)}>
									{!!discount && <span>Discount (-{discount}%)</span>}
									{!!discountPrice && <span>- ₱{discountPrice}</span>}
								</div>
								{/* <div className={styles.subContent}>
							<span>Delivery Fee</span>
							<span>$15</span>
						</div> */}
								<Divider />
								<div className={classNames(styles.subContent, styles.total)}>
									<span>Total</span>
									<span>₱{numComma(products?.reduce((acc, curr) => acc + curr.price, 0))}</span>
								</div>
								<div className={classNames(styles.subContent, styles.promoCode)}>
									<Input placeholder="Add promo Code" prefix={<PercentageOutlined />} />
									<div>Apply </div>
								</div>
								<motion.button
									whileTap={!!deliveryInfo?.length && scaleSize}
									className={styles.checkout}
									style={{ background: !!!deliveryInfo?.length ? 'gray' : '' }}
									onClick={() => {
										paymentMethod === 1 && checkoutCOD()
										paymentMethod === 2 && checkOutBank()
									}}
								>
									Checkout <ArrowRightOutlined />
								</motion.button>
							</>
						)}
						{paymentState === 2 && (
							<>
								<div id="payment-element" />
								<div id="error-messages" />
								<div className="flex justify-between pt-10">
									<div
										className="bg-black  cursor-pointer text-sm rounded-md text-white px-4 py-1"
										onClick={handleConfirmPayment}
									>
										Pay
									</div>
									<div
										className="bg-red-500  cursor-pointer text-sm rounded-md text-white px-4 py-1"
										onClick={() => {
											handleCancelPayment()
											setPaymentState(1)
										}}
									>
										Cancel
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		)
	)
}

export default isAuth(Content)
