'use client'

import { TProduct } from '@/api'
import { jost } from '@/app/page'
import Image from 'next/image'
import { FC } from 'react'
import styles from './styles.module.scss'

const RProducts: FC<{ data: TProduct[] }> = ({ data }) => {
    return (
        <div className={styles.productWrapper}>
            <div className={styles.carousel}>
                {data.map(q => (
                    <div className={styles.itemContainer} key={q.id}>
                        <Image src={q.image} alt={q.product_name} width={1000} height={1000} />
                        <span className={`${styles.cardTitle} ${jost.className}`}>{q.product_name}</span>
                        <span className={styles.cardDescription}>{q.description}</span>
                        <span className={styles.cardFooter}>$ {q.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RProducts
