import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Divider } from 'antd'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import { CartItem } from '@/api'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { capFrstLtr } from '@/constants/helper'

type Props = {
	divider?: boolean
	data: CartItem
}

const Order: FC<Props> = ({ divider = true, data }) => {
	return (
		<>
			<div className={styles.orderWrapper}>
				<Image className={styles.image} src={data?.image?.[0]} alt="image" width={100} height={100} />
				<div className={styles.textContainer}>
					<div className={styles.title}>
						<span>{data?.product_name}</span>
						<MdDelete />
					</div>
					<div className={styles.variant}>
						{data?.variations?.map(q => (
							<span key={q.id}>
								{capFrstLtr(q?.label)}: <p>{q?.value?.[0].value}</p>
							</span>
						))}
					</div>
					<div className={styles.price}>
						<span>₱{data?.price}</span>
						{/* <div className={styles.addItemContainer}>
							<LuMinus />
							<span>1</span>
							<LuPlus />
						</div> */}
					</div>
				</div>
			</div>
			{divider && <Divider />}
		</>
	)
}

export default Order
