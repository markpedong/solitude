import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Rate } from 'antd'
import Image from 'next/image'

type Props = {}

const Product: FC<Props> = () => {
	return (
		<div className={styles.productContainer}>
			<div className={styles.imageContainer}>
                <Image src={'/assets/pen.png'} alt='sample' width={300} height={300}/>
            </div>
			<div className={styles.productHeader}>T shirt with tape details</div>
			<div className={styles.rateContainer}>
				<Rate value={3} />
				<span>3 /<span className='text-neutral-500 pl-1'>5</span></span>
			</div>
            <div className={styles.priceContainer}>
            <span className={styles.price}>₱120</span>
            <span className={styles.price}>₱250</span>
            <span className={styles.price}>-20%</span>

            </div>
		</div>
	)
}

export default Product
