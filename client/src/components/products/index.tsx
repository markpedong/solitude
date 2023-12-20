'use client'

import { Card } from 'antd'
import React, { FC } from 'react'
import styles from './style.module.scss'

type Props = {
    image: string
    title: string
    description: string
    price: string
}

const Product: FC<Props> = ({ description, image, price, title }) => {
    return (
        <div className={styles.item}>
            <Card style={{ width: 240 }} cover={<img src={image} alt="example" />} bordered={false} hoverable>
                <Card.Meta
                    title={<div className={styles.cardTitle}>{title}</div>}
                    description={
                        <>
                            <div className={styles.cardDescription}>{description}</div>
                            <div className={styles.cardFooter}>{price}</div>
                        </>
                    }
                />
            </Card>
        </div>
    )
}

export default Product
