import { SellerData, TProduct } from '@/api'
import { capFrstLtr, dateParser } from '@/constants/helper'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import { RightOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import Image from 'next/image'
import { IoStorefront } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { scaleSize } from '@/constants'

type Props = {
	data: TProduct
	seller: SellerData
}

const OtherDetails: FC<Props> = ({ data, seller }) => {
	return (
		<div>
			<div className={styles.specsHeader}>Product Specifications</div>
			<div className={styles.specificationsWrapper}>
				<div className={styles.labelContainer}>
					{!!data?.categories?.length && <span>Category:</span>}
					<span>Stock:</span>
					<span>Product Added:</span>
				</div>
				<div className={styles.detailsContainer}>
					<span>
						{!!data?.categories?.length && (
							<>
								{data?.categories?.slice(0, -1).map(q => (
									<span key={q}>{q}</span>
								))}
								<RightOutlined /> {data?.categories?.findLast(q => q)}
							</>
						)}
					</span>
					<span>{data?.stock ?? '0'}</span>
					<span>{dateParser(data?.created_at)}</span>
				</div>
			</div>
			<div className={styles.specsHeader}>Product Description</div>
			<span>{data?.description}</span>
			<Divider />
			<div className={styles.specsHeader}>Seller Info</div>
			<div className={styles.sellerInfoWrapper}>
				<Image className={styles.avatar} src={seller?.avatar} alt="seller" width={50} height={50} />
				<div className={styles.sellerDetails}>
					<div className={styles.otherContainer}>
						<span className={styles.sellerName}>{seller?.seller_name}</span>
						<div>
							<span>Phone: </span>
							<span>{!!seller?.phone ? seller?.phone : '-'}</span>
						</div>
						<div>
							<span>Products: </span>
							<span>{seller?.products}</span>
						</div>
					</div>
					<div className={styles.otherContainer}>
						<motion.div className={styles.storeContainer} whileTap={scaleSize}>
							<IoStorefront />
							<span>View Shop</span>
						</motion.div>
						<div>
							<span>Location: </span>
							<span>{seller?.location}</span>
						</div>
						<div>
							<span>Joined: </span>
							<span>{dateParser(+seller?.created_at)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OtherDetails
