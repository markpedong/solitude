import React, { FC } from 'react'
import styles from './styles.module.scss'
import Product from '../product'
import { Divider } from 'antd'

type Props = {
    title: string
}

type LandingProps ={ 
    title: string
}

export const PageHeader: FC<Props> = ({title}) => {
  return <div className={styles.header}>{title}</div>
}


export const LandingContent: FC<LandingProps> = ({title}) => {
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