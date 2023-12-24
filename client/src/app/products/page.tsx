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
                <Col lg={2}></Col>
                <Col lg={20} className={styles.productWrapper}>
                    <Flex className={styles.productHeaderContainer} vertical justify="center" align="center" gap={20}>
                        <span>SOLITUDE / PRODUCTS</span>
                        <h1 className={cormorant.className}>PRODUCTS</h1>
                    </Flex>
                    <Flex className={styles.filterWrapper} justify="space-between" align="center" gap={50}>
                        <Flex className={styles.filterContainer} justify="space-between">
                            {PRODUCT_FILTER.map(q => (
                                <div className={`${jost.className} ${styles.filterLabel}`}>
                                    {q.label} <DownOutlined />
                                </div>
                            ))}
                        </Flex>
                        <div style={{ flex: 1 }} />
                        <div>
                            <Input placeholder="Search" style={{ width: 200 }} suffix={<SearchOutlined />} />
                        </div>
                    </Flex>
                </Col>
                <Col lg={2}></Col>
            </Row>
        </div>
    )
}

export default Products
