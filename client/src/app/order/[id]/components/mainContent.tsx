import { OrderResponse } from '@/api'
import { Divider } from 'antd'
import Image from 'next/image'
import React, { FC, SetStateAction } from 'react'
import { FaStore } from 'react-icons/fa'
import styles from '../styles.module.scss'

type Props = {
	data: OrderResponse
	s: React.Dispatch<SetStateAction<number>>
}

const MainContent: FC<Props> = ({ data: orderedData, s }) => {
	const total = orderedData?.products?.flatMap(q => q.products).reduce((acc, cur) => acc + cur.price, 0)
	

	return (
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
				{/* <div>
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
                    </div> */}
			</div>
			<div className={styles.reviewRateContainer}>
				{/* {reviewProd()}
                    <span>Rate Seller</span> */}
				<span className={styles.rateProduct} onClick={() => s(2)}>Rate Products</span>
				<span>Complete Order</span>
			</div>
		</div>
	)
}

export default MainContent
