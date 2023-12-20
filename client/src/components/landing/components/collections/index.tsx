'use client'

import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Card, Col, Flex, Row, Space } from 'antd'
import test from '@/public/assets/logo.png'
import Image from 'next/image'
import { collectionData } from '@/constants/testdata'

const Collections: FC = () => {
    return (
        <Row justify="center" className={styles.collectionsContainer}>
            <Col></Col>
            <Col span={16}>
                <Flex justify="space-between" className={styles.headerText}>
                    <div>FEATURED COLLECTIONS</div>
                    <div>SEE ALL COLLECTIONS</div>
                </Flex>
                <Space className={styles.featuresItemContainer} size="large">
                    {collectionData.map(q => (
                        <div className={styles.featuresItem}>
                            <Flex className={styles.image} justify="center">
                                <img src={q.image} alt="features" />
                            </Flex>
                            <Flex className={styles.featuresTextContainer} justify="center" vertical={true}>
                                <span>{q.name}</span>
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
