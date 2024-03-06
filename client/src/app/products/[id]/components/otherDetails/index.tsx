import { TProduct } from '@/api'
import { capFrstLtr, dateParser } from '@/constants/helper'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import { RightOutlined } from '@ant-design/icons'
import { Divider } from 'antd'

type Props = {
	data: TProduct
}

const OtherDetails: FC<Props> = ({ data }) => {
	console.log('@@@@@@', data)
	return (
		<div>
			<div className={styles.specsHeader}>Product Specifications</div>
			<div className={styles.specificationsWrapper}>
				<div className={styles.labelContainer}>
					<span>Category:</span>
					<span>Stock:</span>
					<span>Product Added:</span>
				</div>
				<div className={styles.detailsContainer}>
					<span>
						{data?.categories?.slice(0, -1).map(q => q)} <RightOutlined /> {data?.categories?.findLast(q => q)}
					</span>
					<span>{data?.stock}</span>
					<span>{dateParser(data?.created_at)}</span>
				</div>
			</div>
			<div className={styles.specsHeader}>Product Description</div>
			<span>{data?.description}</span>
			<Divider />
			<div className={styles.specsHeader}>Seller Info</div>
		</div>
	)
}

export default OtherDetails
