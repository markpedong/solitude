'use client'

import { Col, Flex, Row, Space } from 'antd'
import Image from 'next/image'
import React, { FC } from 'react'
import styles from './styles.module.scss'
type Props = {}

const Orders: FC<Props> = () => {
    return (
        <Row>
            <Col span={24}>
                <Flex className={styles.orderContainer}>
                    <Image
                        src="https://random.imagecdn.app/150/150?random=965622"
                        alt="order"
                        width={1000}
                        height={1000}
                    />
                    <Flex className={styles.orderDescription} justify="center" align="start" vertical>
                        <span>Cat Litter Box With Scoop Kitten Litter Box Cat Toilet</span>
                        <span>Variation: Green, L: {`[48X40X14CM]`}</span>
                        <span>x1</span>
                    </Flex>
                    <div className={styles.orderPrice}>
                        <span>₱459</span>
                        <span>₱156</span>
                    </div>
                </Flex>
            </Col>
        </Row>
    )
}

export default Orders
