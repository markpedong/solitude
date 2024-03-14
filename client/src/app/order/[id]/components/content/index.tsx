'use client'

import React, { FC, useEffect } from 'react'
import styles from './styles.module.scss'
import { Timeline } from 'antd'
import { FaCheckCircle } from 'react-icons/fa'

type Props = {
	data: any
}

const Content: FC<Props> = ({ data }) => {
	console.log("@@@", data)
	return (
		<div>
			<div className={styles.orderHeader}>Order Details</div>
			<div className={styles.detailsWrapper}>
				<div>
					<Timeline
						items={[
							{
								children: `Order Created ${data?.created_at}`,
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
	)
}

export default Content
