'use client'

import type { MenuProps } from 'antd'
import { Flex, Menu } from 'antd'
import { FC, useState } from 'react'
import logo from '@/public/assets/logo.png'
import Image from 'next/image'
import styles from './styles.module.scss'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

const items: MenuProps['items'] = [
    {
        label: 'PRODUCTS',
        key: 'products',
    },
    {
        label: 'CART',
        key: 'cart',
        icon: <ShoppingCartOutlined />,
    },
    {
        label: 'ACCOUNT',
        key: 'account',
        icon: <UserOutlined />,
    },
]

const Navigation: FC = () => {
    const [current, setCurrent] = useState('mail')

    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e)
        setCurrent(e.key)
    }

    return (
        <Flex className={styles.navigationWrapper} justify="space-around" align="center">
            {/* <Flex className={styles.navigationHeader} justify="center" align="center"> */}
            <Image src={logo} alt="loginForm" />
            {/* <span>SOLITUDE</span> */}
            {/* </Flex> */}
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} disabledOverflow />
        </Flex>
    )
}

export default Navigation
