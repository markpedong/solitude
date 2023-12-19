'use client'

import { Col, Row } from 'antd'
import React, { FC } from 'react'
import styles from './styles.module.scss'

const Join: FC = () => {
    return (
        <Row className={styles.joinContainer} justify="center">
            <Col span={0} xl={8}>
                1
            </Col>
            <Col span={24} xl={8}>
                2
            </Col>
            <Col span={0} xl={8}>
                3
            </Col>
        </Row>
    )
}

export default Join
