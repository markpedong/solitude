'use client'

import { Col, Flex, Row, Tabs, Typography } from 'antd'
import React, { FC } from 'react'
import { cormorant, jost } from '../page'
import classNames from 'classnames'
import styles from './styles.module.scss'

type Props = {}

const Account: FC<Props> = () => {
    const onChange = (key: string) => {
        console.log(key)
    }

    return (
        <Row>
            <Col xs={0} lg={4} />
            <Col lg={16}>
                <Flex className={styles.profileHeader} vertical gap={5} justify="center">
                    <span className={cormorant.className}>Welcome back! {`{Username}`}</span>
                    <span className={jost.className}>Enjoy shopping with ease and happiness.</span>
                </Flex>
                <Tabs
                    onChange={onChange}
                    type="card"
                    items={new Array(3).fill(null).map((_, i) => {
                        const id = String(i + 1)
                        return {
                            label: `Tab ${id}`,
                            key: id,
                            children: `Content of Tab Pane ${id}`,
                        }
                    })}
                />
            </Col>
            <Col xs={0} lg={4} />
        </Row>
    )
}

export default Account
