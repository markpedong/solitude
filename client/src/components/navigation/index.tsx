'use client'

import logo from '@/public/assets/logo.png'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Drawer, Flex, Menu } from 'antd'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Login from './components/login'
import styles from './styles.module.scss'
import Search from './components/search'
import { setNavigationMenu } from '@/redux/features/navigationSlice'

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
    const selected = useAppSelector(state => state.navigation.selected)

    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e)
        setNavigationMenu(e.key)
    }

    const [open, setOpen] = useState(false)

    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    useEffect(() => {}, [selected])

    return (
        <>
            {activeModal && <Login />}
            <Flex className={styles.navigationWrapper} justify="space-around" align="center">
                <Flex className={styles.headerContainer} justify="center" align="center" gap={10}>
                    <Image src={logo} alt="loginForm" />
                    <span>SOLITUDE</span>
                </Flex>
                <div className={styles.navigation}>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[selected]}
                        mode="horizontal"
                        items={items}
                        disabledOverflow
                    />
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
                    <Button type="primary" onClick={showDrawer}>
                        Open
                    </Button>
                    <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
                </div>
            </Flex>
        </>
    )
}

export default Navigation
