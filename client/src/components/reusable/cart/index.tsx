import React, { FC, memo, useEffect } from 'react'
import styles from './styles.module.scss'
import { Divider } from 'antd'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import { CartItem, checkCart, removeCart } from '@/api'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { capFrstLtr, numComma, numSuffix } from '@/constants/helper'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { messageHelper } from '@/constants/antd'
import { setCart } from '@/redux/features/userSlice'
import { useRouter } from 'next/navigation'

type Props = {
	divider?: boolean
	data: CartItem
}

const Cart: FC<Props> = ({ divider = true, data }) => {
	const { userData } = useAppSelector(s => s.userData)
	const dispatch = useAppDispatch()
	const router = useRouter()

	const handleRemoveCart = async () => {
		const res = await removeCart({ user_id: userData?.id, checkout_id: data?.checkout_id })
		const cart = await checkCart({ user_id: userData?.id })

		messageHelper(res)
		dispatch(setCart(cart?.data ?? []))
	}

	return (
		<>
			<div className={styles.orderWrapper}>
				<Image className={styles.image} src={data?.image} alt="image" width={100} height={100} priority />
				<div className={styles.textContainer}>
					<div className={styles.title}>
						<span onClick={() => router.push(`/products/${data?.product_id}`)}>{data?.product_name}</span>
						<MdDelete onClick={handleRemoveCart} className="cursor-pointer" />
					</div>
					{!!data?.variations?.length && <div>Variation: {data?.variations?.map(q => `${q.label}:${q?.value}, `)}</div>}
					<span className={styles.qty}>Quantity: {data?.quantity}</span>
					<div className={styles.price}>
						{!!!data?.discount_price ? (
							<span>₱{numComma(data?.price)}</span>
						) : (
							<span>₱{numComma(data?.discount_price)}</span>
						)}
						{!!data?.discount_price && <span>₱{numComma(data?.price)}</span>}
						{!!data?.discount && <span>-{numComma(data?.discount)}%</span>}
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

export default memo(Cart)
