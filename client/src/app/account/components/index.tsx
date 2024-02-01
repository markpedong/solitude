'use client'

import { Col, Flex, Row, Tabs } from 'antd'
import React, { FC, useEffect } from 'react'
import styles from './styles.module.scss'
import Profile from './profile'
import Orders from './orders'
import { TProduct } from '@/api'
import Address from './address'
import { Cormorant, Jost } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import AddProduct from './product'

const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })
const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
    products: TProduct[]
}

const Account: FC<Props> = ({ products }) => {
    const router = useRouter()
    const { userData } = useAppSelector(state => state.userData)

    const onChange = (key: string) => {
        console.log(key)
    }

    useEffect(() => {
        !!!userData?.id && router.push('/')
    }, [userData?.id])

    return (
        <Row justify="center">
            <Col span={16}>
                <Flex className={styles.profileHeader} vertical gap={5} justify="center">
                    <span className={cormorant.className}>Welcome back! {userData?.first_name}</span>
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
        </Row>
    )
}

export default Account