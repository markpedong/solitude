'use client'

import { TCollection } from '@/api'
import { Col, Flex, Row, Space } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'
import { cormorant, jost } from '@/app/page'
import Collection from '@/components/collections'

const Collections: FC<{ data: TCollection[] }> = ({ data }) => {
    return (
        <Row justify="center" className={styles.collectionsContainer}>
            <Col></Col>
            <Col span={16}>
                <Flex justify="space-between" className={styles.headerText} vertical>
                    <span className={cormorant.className}>Featured Collections</span>
                    <span className={jost.className}>SEE ALL COLLECTIONS</span>
                </Flex>
                <Space className={styles.featuresItemContainer} size="large">
                    {data.map(q => (
                        <Collection description={q.description} image={q.image} title={q.title} key={q.title} />
                    ))}
                </Space>
            </Col>
            <Col></Col>
        </Row>
    )
}

export default Collections
