'use client'

import { PRODUCT_FILTER } from '@/constants'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import { Col, Flex, Input, Row } from 'antd'
import { FC } from 'react'
import { cormorant, jost } from '../page'
import styles from './styles.module.scss'

const Products: FC = () => {
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
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    )
}

export default Products
