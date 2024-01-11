'use client'

import { Col, Flex, Row, Tabs, Typography } from 'antd'
import React, { FC } from 'react'
import { cormorant, jost } from '../page'
import classNames from 'classnames'
import styles from './styles.module.scss'
import Profile from './components/profile'
import Orders from './components/orders'
import AddProduct from './components/addProduct'
import { TProduct } from '@/api'
import Address from './components/address'

type Props = {
    products: TProduct[]
}

const Account: FC<Props> = ({ products }) => {
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
                        defaultActiveKey="profile"
                        items={[
                            { key: 'profile', label: 'PROFILE', children: <Profile /> },
                            { key: 'favourites', label: 'ORDERS', children: <Orders /> },
                            { key: 'products', label: 'PRODUCTS', children: <AddProduct products={products} /> },
                            { key: 'address', label: 'ADDRESS', children: <Address /> },
                        ]}
                    />
                </div>
            </Col>
            <Col xs={0} lg={4} />
        </Row>
    )
}

export default Account
