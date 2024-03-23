import { CartItem } from '@/api'
import React, { FC, SetStateAction } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from '../styles.module.scss'
import Image from 'next/image'
import { Divider, Input } from 'antd'

type Props = {
	products: CartItem[]
	s: React.Dispatch<SetStateAction<number>>
}

const RateProducts: FC<Props> = ({ products: q, s }) => {
	console.log('@@@@', q)
	return (
		<div>
			<IoMdArrowRoundBack onClick={() => s(1)} />
			<div className={styles.productWrapper}>
				{q?.map((w, i) => (
					<div className={styles.productContainer} key={i}>
						<Image src={w?.image} alt="product_img" height={40} width={40} />
						<div className={styles.productDetails}>
							<span>{w?.product_name}</span>
							{/* <div className={styles.rateContainer}>
								<Input.TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
							</div> */}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default RateProducts
