import { CheckOutlined } from '@ant-design/icons'
import { Divider, Rate } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'
import Product from './product'

type Props = {
	title: string
}

type LandingProps = {
	title: string
}

type ReviewProps = {
	product?: boolean
}

export const PageHeader: FC<Props> = ({ title }) => {
	return <div className={styles.header}>{title}</div>
}

export const LandingContent: FC<LandingProps> = ({ title }) => {
	return (
		<div className={styles.newArrivalWrapper}>
			<PageHeader title={title} />
			<div className={styles.productContainer}>
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
			</div>
			<div className={styles.viewButtonContainer}>
				<span className={styles.button}>View All</span>
			</div>
			<Divider />
		</div>
	)
}

export const ReviewComp: FC<ReviewProps> = ({ product }) => {
	return (
		<div className={styles.reviewContainer} style={{ width: product ? '38.125rem' : '' }}>
			<Rate value={3} />
			<div className={styles.nameContainer}>
				<span>Sarah M.</span>
				<CheckOutlined />
			</div>
			<span className={styles.comment}>
				"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
			</span>
		</div>
	)
}
