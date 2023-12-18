'use client'

import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Card, Col, Flex, Row } from 'antd'
import test from '@/public/assets/logo.png'
import Image from 'next/image'

const Collections: FC = () => {
    return (
        <div className={styles.collectionsContainer}>
            <Row justify="center">
                <Col></Col>
                <Col span={16}>
                    <Flex justify="space-between">
                        <div>FEATURED COLLECTIONS</div>
                        <div>SEE ALL COLLECTIONS</div>
                    </Flex>
                    <div className={styles.featuresItemContainer}>
                        <div className={styles.featuresItem}>
                            <div className={styles.image}>
                                <Image src={test} alt="features" />
                            </div>
                            <div className={styles.featuresTextContainer}>
                                <span>COLLECTION #1</span>
                                <span>Short Description</span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default Collections