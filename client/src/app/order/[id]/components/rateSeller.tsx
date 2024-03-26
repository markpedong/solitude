import { OrderResponse, addSellerRating } from '@/api'
import React, { FC, SetStateAction, useState } from 'react'
import styles from '../styles.module.scss'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Input, Rate, message } from 'antd'
import { FaStore } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { scaleSize } from '@/constants'
import { useParams, useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { messageHelper } from '@/constants/antd'

type Props = {
	data: OrderResponse
	s: React.Dispatch<SetStateAction<number>>
}

const RateSeller: FC<Props> = ({ data, s }) => {
	const { id: group_id } = useParams()
	const router = useRouter()
	const { userData } = useAppSelector(s => s.userData)
	const [reviews, setReviews] = useState([])
	const [openContainers, setOpenContainers] = useState([])
	const reviewLength = reviews?.filter(r => r).map(w => w?.rating).length < data?.products?.length

	const openContainer = index => {
		setOpenContainers(prevOpenContainers => {
			if (!prevOpenContainers.includes(index)) {
				return [...prevOpenContainers, index]
			}
			return prevOpenContainers
		})
	}

	const handleInputChange = (index, event) => {
		const { name, value } = event.target
		const newReviews = [...reviews]
		newReviews[index] = { ...newReviews[index], description: value, seller_id: data?.products[index]?.seller_id }
		setReviews(newReviews)
	}

	const handleRateChange = (index, value) => {
		const newReviews = [...reviews]
		newReviews[index] = { ...newReviews[index], rating: value, seller_id: data?.products[index]?.seller_id }
		setReviews(newReviews)
	}

	const submitReview = async () => {
		if (reviewLength) {
			message.error('review everything first')
			return
		}

		const res = await addSellerRating({ reviews, user_id: userData?.id, group_id })
		messageHelper(res)
		setReviews([])
		s(1)
	}

	return (
		<div>
			<div className={styles.backContainer}>
				<IoMdArrowRoundBack onClick={() => s(1)} />
				<span>Back</span>
			</div>
			<div className={styles.rateSellerWrapper}>
				{data?.products.map((w, i) => (
					<div className={styles.rateSellerContainer} key={w?.seller_id}>
						<div className={styles.sellerData}>
							<FaStore />
							<span>{w?.seller_name}</span>
							<span onClick={() => router.push(`/brands/${w?.seller_id}`)}>View Shop</span>
						</div>
						<div className={styles.sellerRate} onClick={() => openContainer(i)}>
							<span className={styles.sellerH}>Seller Performance:</span>
							<Rate allowClear={false} allowHalf defaultValue={0} onChange={value => handleRateChange(i, value)} />
						</div>
						{openContainers.includes(i) && (
							<Input.TextArea rows={3} placeholder="Give Description........" onChange={e => handleInputChange(i, e)} />
						)}
					</div>
				))}
			</div>
			<div className={styles.btnContainer}>
				<motion.span whileTap={scaleSize} onClick={() => s(1)}>
					Cancel
				</motion.span>
				<motion.span whileTap={scaleSize} className={`${reviewLength ? '!bg-gray-400' : ''}`} onClick={submitReview}>
					Submit
				</motion.span>
			</div>
		</div>
	)
}

export default RateSeller
