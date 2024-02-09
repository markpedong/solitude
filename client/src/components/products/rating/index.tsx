import React, { FC } from 'react'
import styles from './styles.module.scss'
import { ControlOutlined, DownOutlined } from '@ant-design/icons'
type Props = {}

const Rating: FC = (props: Props) => {
	return (
		<div className={styles.ratingWrapper}>
			<div className={styles.headerContainer}>
				<div>
					<span>All Reviews</span>
					<span>{'(451)'}</span>
				</div>
				<div>
					<ControlOutlined className={styles.filter} />
					<div className={styles.latest}>
						<span>Latest</span>
						<DownOutlined />
					</div>
					<span className={styles.review}>Write a Review</span>
				</div>
			</div>
		</div>
	)
}

export default Rating
