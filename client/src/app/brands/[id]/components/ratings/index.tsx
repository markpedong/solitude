import { RatingItem } from '@/api'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import { ReviewComp } from '@/components/reusable'

type Props = {
	reviews: RatingItem[]
}

const RatingsComponent: FC<Props> = ({ reviews }) => {
	return (
		<div className={styles.reviewListWrapper}>
			{reviews?.map(q => (
				<ReviewComp data={q} key={q?.id} />
			))}
		</div>
	)
}

export default RatingsComponent
