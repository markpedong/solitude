'use client'

import { jost } from '@/app/page'
import { MODAL_FORM_PROPS } from '@/constants'
import logo from '@/public/assets/logo.png'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-components'
import type { MenuProps } from 'antd'
import { Drawer, Flex, Input, Menu } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Login from './components/login'
import styles from './styles.module.scss'

const MenuItem: FC<{ url: string }> = ({ url }) => (
    <Link
        href={`/${url}`}
        className={jost.className}
        style={{ letterSpacing: '0.1rem', textTransform: 'uppercase', color: 'black' }}>
        {url.toUpperCase()}
    </Link>
)
const items: MenuProps['items'] = [
    {
        label: <MenuItem url="products" />,
        key: 'products',
    },
    {
        label: <MenuItem url="brands" />,
        key: 'brands',
    },
    {
        label: <MenuItem url="deals" />,
        key: 'deals',
    },
    {
        label: <MenuItem url="services" />,
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

    const renderSearch = () => {
        return (
            <ModalForm
                {...MODAL_FORM_PROPS}
                title="SEARCH FOR A PRODUCT"
                trigger={<SearchOutlined />}
                submitter={false}>
                <Input placeholder="eg. Sweater, T-Shirts, Shorts" />
            </ModalForm>
        )
    }

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
                        {renderSearch()}
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
                                <Link href="/" style={{ color: 'black' }}>
                                    <span>SOLITUDE</span>
                                </Link>
                                <Flex className={styles.icons} gap={20}>
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
                        <Flex vertical gap={30}>
                            <MenuItem url="products" />
                            <MenuItem url="brands" />
                            <MenuItem url="deals" />
                            <MenuItem url="services" />
                        </Flex>
                    </Drawer>
                </div>
            </Flex>
        </>
    )
}

export default Navigation
