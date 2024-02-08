import { CheckOutlined } from '@ant-design/icons'
import { Divider, Rate } from 'antd'
import { FC } from 'react'
import Product from '../product'
import styles from './styles.module.scss'

type Props = {
	title: string
}

type LandingProps = {
	title: string
}

type ReviewProps = {
	title: string
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

export const ReviewComp: FC = ({}) => {
	return (
		<div className={styles.reviewContainer}>
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
