import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { RatingItem, getReviews } from '@/api'
import { useAppSelector } from '@/redux/store'
import { ReviewComp } from '@/components/reusable'

const Ratings = () => {
	const { userData } = useAppSelector(s => s.userData)
	const [reviewItems, setReviewItems] = useState<RatingItem[]>([])

	const fetchReviews = async () => {
		const res = await getReviews({ user_id: userData?.id })

		setReviewItems(res?.data)
	}

	useEffect(() => {
		fetchReviews()
	}, [])

	return (
		<div className="grid grid-cols-3 gap-5">
			{reviewItems?.map(q => (
				<ReviewComp data={q} key={q?.id} user />
			))}
		</div>
	)
}

export default Ratings
