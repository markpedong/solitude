import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Divider } from 'antd'
import Image from 'next/image'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { TProduct } from '@/api'

type Props = {
	divider?: boolean
	data: TProduct
}

const Order: FC<Props> = ({ divider = true }) => {
	return (
		<>
			<div className={styles.orderWrapper}>
				<Image className={styles.image} src={'/assets/pen.png'} alt="image" width={100} height={100} />
				<div className={styles.textContainer}>
					<div className={styles.title}>
						<span>Gradient Graphic T-shirt</span>
						<DeleteOutlined />
					</div>
					<div className={styles.variant}>
						<span>
							Size: <p>Large</p>
						</span>
						<span>
							Color: <p>White</p>
						</span>
					</div>
					<div className={styles.price}>
						<span>$145</span>
						<div className={styles.addItemContainer}>
							<MinusOutlined />
							<span>1</span>
							<PlusOutlined />
						</div>
					</div>
				</div>
			</div>
			{divider && <Divider />}
		</>
	)
}

export default Order
