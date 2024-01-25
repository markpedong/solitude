'use client'

import { TProduct } from '@/api'
import { Col, Divider, Flex, Row } from 'antd'
import React, { FC, memo } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Product } from '@/components/reusable'
import { Cormorant } from 'next/font/google'

const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })

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
                    <Row gutter={20} className={styles.productContainer}>
                        <Col span={9}>
                            <Image src={data.image} alt={data.id} height={1000} width={1000} />
                        </Col>
                        <Col span={11} className={styles.productDescription}>
                            <h1>{data.product_name}</h1>
                            <span>{data.description}</span>
                            <span>$ {data.price.toFixed(2)}</span>
                        </Col>
                    </Row>
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
