'use client'

import { TProduct } from '@/api'
import { Col, Divider, Flex, Row, Space } from 'antd'
import React, { FC, memo } from 'react'
import styles from './styles.module.scss'
import Product from '@/components/products'
import { cormorant } from '@/app/page'

type Props = {
    data: TProduct
    list: TProduct[]
}

const ProductDetails: FC<Props> = ({ data, list }) => {
    return (
        <div>
            <Row justify="center">
                <Col md={2}></Col>
                <Col span={24} md={20}>
                    {JSON.stringify(data)}
                    <div>
                        <Flex
                            className={`${cormorant.className} ${styles.extraProductHeader}`}
                            justify="center"
                            vertical>
                            <Divider />
                            <span>DAILY DISCOVER</span>
                            <Divider />
                        </Flex>
                        <Flex className={styles.extraProductContainer} wrap="wrap" justify="center">
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
                    </div>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    )
}

export default memo(ProductDetails)
