'use client'

import logo from '@/public/assets/logo.png'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Drawer, Flex, Menu, Typography } from 'antd'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Login from './components/login'
import styles from './styles.module.scss'
import Search from './components/search'
import Link from 'next/link'

const { Text } = Typography

const items: MenuProps['items'] = [
    {
        label: <Link href="/products">PRODUCTS</Link>,
        key: 'products',
    },
    {
        label: <Link href="/brands">BRANDS</Link>,
        key: 'brands',
    },
    {
        label: <Link href="/deals">DEALS</Link>,
        key: 'deals',
    },
    {
        label: <Link href="/services">SERVICES</Link>,
        key: 'services',
    },
]

const Navigation: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [open, setOpen] = useState(false)
    const activeModal = useAppSelector(state => state.boolean.activeLoginModal)

    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            {activeModal && <Login />}
            <Flex className={styles.navigationWrapper} justify="space-between" align="center">
                <Flex className={styles.headerContainer} justify="center" align="center" gap={10}>
                    <Image src={logo} alt="loginForm" />
                    <span>
                        <Link href="/">SOLITUDE</Link>
                    </span>
                </Flex>
                <div className={styles.navigation}>
                    <Menu mode="horizontal" items={items} disabledOverflow />
                    <Flex className={styles.icons} gap={20}>
                        <Search />
                        <UserOutlined
                            onClick={() => {
                                dispatch(setActiveLoginModal(true))
                            }}
                        />
                    </Flex>
                </div>
                <div className={styles.navigationMobile}>
                    <MenuOutlined onClick={showDrawer} className={styles.navigationIcon} height={1000} width={1000} />
                    <Drawer
                        title={
                            <Flex justify="space-between" align="center" gap={10}>
                                <Link href="/">
                                    <span>SOLITUDE</span>
                                </Link>
                                <Flex className={styles.icons} gap={20}>
                                    <Search />
                                    <UserOutlined
                                        onClick={() => {
                                            dispatch(setActiveLoginModal(true))
                                        }}
                                    />
                                </Flex>
                            </Flex>
                        }
                        placement="right"
                        onClose={onClose}
                        open={open}>
                        <Flex className={styles.mobileNavigation} vertical gap={30}>
                            <Link href="/products">
                                <Typography.Text>PRODUCTS</Typography.Text>
                            </Link>
                            <Link href="/brands">
                                <Typography.Text>BRANDS</Typography.Text>
                            </Link>
                            <Link href="/deals">
                                <Typography.Text>DEALS</Typography.Text>
                            </Link>
                            <Link href="/services">
                                <Typography.Text>SERVICES</Typography.Text>
                            </Link>
                        </Flex>
                    </Drawer>
                </div>
            </Flex>
        </>
    )
}

export default Navigation
