'use client'

import { Col, Flex, Row, Tabs, Typography } from 'antd'
import React, { FC } from 'react'
import { cormorant, jost } from '../page'
import classNames from 'classnames'
import styles from './styles.module.scss'
import Profile from './components/profile'
import Orders from './components/orders'
import AddProduct from './components/addProduct'

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
                <div className={styles.tabsContainer}>
                    <Tabs
                        onChange={onChange}
                        type="card"
                        items={[
                            { key: 'profile', label: 'PROFILE', children: <Profile /> },
                            { key: 'favourites', label: 'ORDERS', children: <Orders /> },
                            { key: 'products', label: 'PRODUCTS', children: <AddProduct /> },
                            { key: 'collections', label: 'COLLECTIONS', children: <div>COLLECTIONS</div> },
                        ]}
                    />
                </div>
            </Col>
            <Col xs={0} lg={4} />
        </Row>
    )
}

export default Account
