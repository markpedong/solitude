import { InfoItem } from '@/api'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import { capFrstLtr } from '@/constants/helper'

type Props = {
	data: InfoItem
}

const DeliveryInfo: FC<Props> = ({ data }) => {
	return (
		<div className={styles.detailsContainer}>
			<div>
				<span>{capFrstLtr(data?.first_name)} {capFrstLtr(data?.last_name)}</span> | <span>+{data?.phone}</span>
			</div>
			<div>
				{data?.house}, {data?.street}
			</div>
			<div>
				{data?.city}, {data?.pin_code}
			</div>
			<div>
				<span className={data?.address_type === 1 && styles.activeAddress}>Default</span>
				<span className={data?.address_type === 2 && styles.activeAddress}>Pickup Address</span>
				<span className={data?.address_type === 3 && styles.activeAddress}>Return Address</span>
			</div>
		</div>
	)
}

export default DeliveryInfo
