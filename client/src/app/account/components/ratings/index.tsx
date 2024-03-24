import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { RatingItem, getReviews } from '@/api'
import { useAppSelector } from '@/redux/store'
import { ReviewComp } from '@/components/reusable'
import { messageHelper } from '@/constants/antd'
import { isEmpty, isNil, omit, omitBy } from 'lodash'

const Ratings = () => {
	const { userData, sellerData } = useAppSelector(s => s.userData)
	const [reviewItems, setReviewItems] = useState<RatingItem[]>([])

	const fetchReviews = async () => {
		const res = await getReviews(
			omitBy(
				{
					user_id: userData?.id,
					seller_id: sellerData?.seller_id
				},
				isEmpty
			)
		)

		messageHelper(res)
		if (res?.success) {
			setReviewItems(res?.data ?? [])
		}
	}

	useEffect(() => {
		fetchReviews()
	}, [])

	return (
		<div className="grid grid-cols-3 gap-5">
			{reviewItems?.map(q => (
				<ReviewComp data={q} key={q?.id} />
			))}
		</div>
	)
}

export default Ratings
