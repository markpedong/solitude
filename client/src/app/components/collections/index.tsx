'use client'

import { TCollection } from '@/api'
import { Col, Flex, Row, Space } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'
import { cormorant, jost } from '@/app/page'

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
                        <div className={styles.featuresItem} key={q.image}>
                            <Flex className={styles.image} justify="center">
                                <img src={q.image} alt="features" />
                            </Flex>
                            <Flex
                                className={`${styles.featuresTextContainer} ${jost.className}`}
                                justify="center"
                                vertical={true}>
                                <span>{q.title}</span>
                                <span>{q.description}</span>
                            </Flex>
                        </div>
                    ))}
                </Space>
            </Col>
            <Col></Col>
        </Row>
    )
}

export default Collections
