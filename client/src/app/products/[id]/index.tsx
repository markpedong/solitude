'use client'

import { TProduct } from '@/api'
import { Col, Flex, Row } from 'antd'
import React, { FC, memo } from 'react'
import styles from './styles.module.scss'
import Product from '@/components/products'

type Props = {
    data: TProduct
    list: TProduct[]
}

const ProductDetails: FC<Props> = ({ data, list }) => {
    return (
        <div>
            <Row justify="center">
                <Col md={2}></Col>
                <Col span={24} md={20} className={styles.productWrapper}>
                    {JSON.stringify(data)}
                    <Flex className={styles.productContainer} wrap="wrap" justify="center">
                        {list.map(q => (
                            <Product
                                className={styles.itemContainer}
                                description={q.description}
                                id={q.id}
                                image={q.image}
                                price={q.price}
                                product_name={q.product_name}
                                key={q.id}
                            />
                        ))}
                    </Flex>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    )
}

export default memo(ProductDetails)
