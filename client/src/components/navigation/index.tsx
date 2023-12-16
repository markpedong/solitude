'use client'

import type { MenuProps } from 'antd'
import { Flex, Menu } from 'antd'
import { FC, useState } from 'react'
import logo from '@/public/assets/logo.png'
import Image from 'next/image'
import styles from './styles.module.scss'
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import Login from './components/login'

const items: MenuProps['items'] = [
    {
        label: 'PRODUCTS',
        key: 'products',
    },
    {
        label: 'BRANDS',
        key: 'brands',
    },
    {
        label: 'DEALS',
        key: 'deals',
    },
    {
        label: 'SERVICES',
        key: 'services',
    },
]

const Navigation: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const activeModal = useAppSelector(state => state.boolean.activeLoginModal)
    const [current, setCurrent] = useState('mail')

    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e)
        setCurrent(e.key)
    }

    return (
        <>
            {activeModal && <Login />}
            <Flex className={styles.navigationWrapper} justify="space-around" align="center">
                <Flex className={styles.headerContainer} justify="center" align="center" gap={10}>
                    <Image src={logo} alt="loginForm" />
                    <span>SOLITUDE</span>
                </Flex>
                <Flex align="center">
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} disabledOverflow />
                    <Flex className={styles.icons} gap={20}>
                        <SearchOutlined />
                        {/* RENDER THIS IF TOKEN EXISTS */}
                        {/* <ShoppingCartOutlined /> */}
                        <UserOutlined
                            onClick={() => {
                                dispatch(setActiveLoginModal(true))
                            }}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Navigation
