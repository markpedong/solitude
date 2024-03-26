import React, { useEffect, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { RatingItem, getReviews, getSellerRatings } from '@/api'
import { useAppSelector } from '@/redux/store'
import { ReviewComp } from '@/components/reusable'
import { messageHelper } from '@/constants/antd'
import { isEmpty, isNil, omit, omitBy } from 'lodash'

const Ratings = () => {
	const { userData, sellerData } = useAppSelector(s => s.userData)
	const [reviewItems, setReviewItems] = useState<RatingItem[]>([])

	const fetchReviews = async () => {
		let res

		if (!!userData?.id) {
			res = await getReviews({
				user_id: userData?.id
			})
		}

		if (!!sellerData?.seller_id) {
			res = await getSellerRatings({
				seller_id: sellerData?.seller_id
			})
		}

		if (res?.success) {
			setReviewItems(res?.data ?? [])
		}
	}

	const memoizedReviews = useMemo(() => {
		return (
			<div className="grid grid-cols-3 gap-5">
				{reviewItems ? reviewItems.map(q => <ReviewComp data={q} key={q?.id} />) : null}
			</div>
		)
	}, [reviewItems])

	useEffect(() => {
		fetchReviews()
	}, [])

	return memoizedReviews
}

export default Ratings
