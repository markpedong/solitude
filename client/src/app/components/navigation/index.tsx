'use client'

import { jost } from '@/app/page'
import { MODAL_FORM_PROPS } from '@/constants'
import logo from '@/public/assets/logo.png'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { MenuOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-components'
import type { MenuProps } from 'antd'
import { Col, Drawer, Flex, Grid, Input, Menu, Row, Space } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Login from './components/login'
import styles from './styles.module.scss'
import { TProduct, getProducts } from '@/api'
import Collection from '@/components/collections'

const MenuItem: FC<{ url: string }> = ({ url }) => (
    <Link
        href={`/${url}`}
        className={jost.className}
        style={{ letterSpacing: '0.1rem', textTransform: 'uppercase', color: 'black', textAlign: 'center' }}>
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
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState<TProduct[]>([])
    const [searchFilter, setSearchFilter] = useState('')
    const dispatch = useDispatch<AppDispatch>()
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

    const handleGetFeatures = async () => {
        const res = await getProducts()

        setProducts(res.data)
    }

    const handleSearch = e => {
        const value = e.target.value.toLowerCase()
        setSearchFilter(value) // Update search filter
    }

    const filteredProducts = useMemo(() => {
        return products.filter(product => product.product_name.toLowerCase().includes(searchFilter))
    }, [products, searchFilter])

    useEffect(() => {
        handleResize()
        handleGetFeatures()
    }, [])

    const renderSearch = () => {
        return (
            <ModalForm
                {...MODAL_FORM_PROPS}
                title="SEARCH FOR A PRODUCT"
                trigger={<SearchOutlined />}
                submitter={false}
                style={{ height: 300, overflowY: 'auto' }}>
                <div
                    style={{
                        position: 'sticky',
                        top: 0,
                    }}>
                    <Input placeholder="eg. Sweater, T-Shirts, Shorts" onChange={handleSearch} />
                </div>
                <Flex className={styles.collectionsContainer} justify="center" vertical gap={10}>
                    {filteredProducts.map(q => (
                        <Collection
                            key={q.id}
                            description={q.description}
                            image={q.image}
                            title={q.product_name}
                            className={styles.collectionItem}
                        />
                    ))}
                </Flex>
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
                            <Flex justify="center">
                                <Flex justify="center" align="center" style={{ flex: 1 }}>
                                    <Image src={logo} alt="loginForm" width={20} height={20} />
                                </Flex>
                                <SearchOutlined
                                    onClick={() => {
                                        dispatch(setActiveLoginModal(true))
                                    }}
                                />
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
                            <MenuItem url="account" />
                        </Flex>
                    </Drawer>
                </div>
            </Flex>
        </>
    )
}

export default Navigation
