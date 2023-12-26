'use client'

import { PRODUCT_FILTER } from '@/constants'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import { Col, Flex, Input, Row } from 'antd'
import { FC, memo } from 'react'
import { cormorant, jost } from '@/app/page'
import styles from './styles.module.scss'
import { TProduct } from '@/api'
import Image from 'next/image'
import Product from '@/components/products'

const Products: FC<{ data: TProduct[] }> = ({ data }) => {
    return (
        <div>
            <Row justify="center">
                <Col md={2}></Col>
                <Col span={24} md={20} className={styles.productWrapper}>
                    <Flex className={styles.productHeaderContainer} vertical justify="center" align="center" gap={20}>
                        <span>SOLITUDE / PRODUCTS</span>
                        <h1 className={cormorant.className}>PRODUCTS</h1>
                    </Flex>
                    <Flex className={styles.filterWrapper} justify="space-between" align="center">
                        <Flex className={styles.filterContainer} justify="space-between">
                            {PRODUCT_FILTER.map(q => (
                                <Flex
                                    className={`${jost.className} ${styles.filterLabel}`}
                                    justify="center"
                                    align="center">
                                    {q.label} <DownOutlined />
                                </Flex>
                            ))}
                        </Flex>
                        <div>
                            <Input placeholder="Search" style={{ width: 200 }} suffix={<SearchOutlined />} />
                        </div>
                    </Flex>
                    ADD FILTER FOR MOBILE
                    <Flex className={styles.productContainer} wrap="wrap" justify="center">
                        {data.map(q => (
                            <Product
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

export default memo(Products)
