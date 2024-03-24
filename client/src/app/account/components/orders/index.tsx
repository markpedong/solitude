'use client'

import Image from 'next/image'
import { FC, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '@/redux/store'
import { OrderItem, getOrders } from '@/api'
import { messageHelper } from '@/constants/antd'
import Order from '@/components/reusable/order'
import styles from '../styles.module.scss'

type Props = {}

const Orders: FC<Props> = () => {
	const {
		userData: { id }
	} = useAppSelector(s => s.userData)
	const [orders, setOrders] = useState<OrderItem[]>([])

	const memoizedOrders = useMemo(() => {
		return (
			<div className={styles.orderWrapper}>
				{orders?.map(q => (
					<Order data={q} key={q?.order_id} />
				))}
			</div>
		)
	}, [orders])

	const fetchOrders = async () => {
		const res = await getOrders({ id })

		setOrders((res?.data as OrderItem[]) ?? [])
	}

	useEffect(() => {
		fetchOrders()
	}, [id])

	return memoizedOrders
}

export default Orders
