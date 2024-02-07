'use client'

import { TProduct, getProducts, sellerLogin, sellerSignup, userLogin, userSignup } from '@/api'
import Profile from '@/components/profile'
import { MODAL_FORM_PROPS, USER_TYPES } from '@/constants'
import { afterModalformFinish } from '@/constants/helper'
import logo from '@/public/assets/logo.webp'
import { setActiveLoginForm } from '@/redux/features/booleanSlice'
import { resetUserData, setSellerData, setType, setUserData, setUserToken } from '@/redux/features/userSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getLocalStorage, setLocalStorage } from '@/utils/xLocalStorage'
import {
    MenuOutlined,
    SearchOutlined,
    UserOutlined
} from '@ant-design/icons'
import { ActionType, ModalForm, ProFormInstance } from '@ant-design/pro-components'
import type { MenuProps } from 'antd'
import { Col, Drawer, Dropdown, Flex, Input, Row, Typography } from 'antd'
import classNames from 'classnames'
import { Jost } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Collection } from '../reusable'
import styles from './styles.module.scss'
import ModalProfile from './modalProfile'

const jost = Jost({ weight: '400', subsets: ['latin'] })
const searchStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
}

const Navigation: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState<TProduct[]>([])
    const [searchFilter, setSearchFilter] = useState('')
    const { activeLoginForm } = useAppSelector(state => state.boolean)
    const { isLoggedIn, type } = useAppSelector(state => state.userData)
    const formRef = useRef<ProFormInstance>()
    const actionRef = useRef<ActionType>()
    const router = useRouter()
    const create = activeLoginForm === 'create'
    const login = activeLoginForm === 'login'
    const seller = activeLoginForm === 'seller'

    const filteredProducts = useMemo(() => {
        return products?.filter(product => product.product_name.toLowerCase().includes(searchFilter))
    }, [products, searchFilter])

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setOpen(false)
        }
    }

    const handleGetFeatures = async () => {
        const res = await getProducts({})

        setProducts(res.data)
    }

    const handleSearch = e => {
        const value = e.target.value.toLowerCase()
        setSearchFilter(value)
    }

    const renderSearch = () => {
        return (
            <ModalForm
                {...MODAL_FORM_PROPS}
                title={<span className={jost.className}>SEARCH FOR A PRODUCT</span>}
                trigger={<SearchOutlined />}
                submitter={false}
                style={{ height: 300, overflowY: 'auto' }}>
                <div style={searchStyle}>
                    <Input placeholder="eg. Sweater, T-Shirts, Shorts" onChange={handleSearch} />
                </div>
                <Flex className={styles.collectionsContainer} justify="center" vertical gap={10}>
                    {filteredProducts?.map(q => (
                        <Collection
                            key={q.product_id}
                            description={q.description}
                            image={q.image as unknown as string}
                            title={q.product_name}
                            className={styles.collectionItem}
                        />
                    ))}
                </Flex>
            </ModalForm>
        )
    }

    const handleFinish = async params => {
        let res

        if (create && type === USER_TYPES.USER) {
            res = await userSignup(params)
            await dispatch(setUserData(res?.data))
            dispatch(setType(USER_TYPES.USER))
        }

        if (create && type === USER_TYPES.SELLER) {
            res = await sellerSignup(params)
            await dispatch(setSellerData(res?.data))
            dispatch(setType(USER_TYPES.SELLER))
        }

        if (login) {
            res = await userLogin(params)
            await dispatch(setUserData(res?.data))
            dispatch(setType(USER_TYPES.USER))
        }

        if (seller) {
            res = await sellerLogin(params)
            await dispatch(setSellerData(res?.data))
            dispatch(setType(USER_TYPES.SELLER))
        }

        if (res?.success) {
            await dispatch(setUserToken(res?.token))
            setLocalStorage('token', res?.token)
            formRef?.current?.resetFields()
            router.push('/account')
        }

        return afterModalformFinish(actionRef, res?.message, res?.success)
    }

    const renderLogin = () =>
        isLoggedIn && !!getLocalStorage('token') ? (
            <Dropdown menu={{ items }} placement="bottom">
                <UserOutlined onClick={e => e.preventDefault()} />
            </Dropdown>
        ) : (
            <ModalForm
                trigger={<UserOutlined />}
                submitter={false}
                width={create ? 1000 : 600}
                modalProps={{ style: { top: create ? '5%' : '10%' }, destroyOnClose: true, maskClosable: false }}
                grid={true}
                formRef={formRef}
                preserve={false}
                onOpenChange={visible => {
                    if (!visible) {
                        formRef?.current?.resetFields()
                        dispatch(setActiveLoginForm('login'))
                    }
                }}
                onFinish={handleFinish}>
                <ModalProfile formRef={formRef} />
            </ModalForm>
        )

    const renderMenuItem = (href: string) => (
        <span className={styles.menuItem} onClick={() => router.push(`/${href}`)}>
            {href}
        </span>
    )

    const items: MenuProps['items'] = [
        {
            key: 'account',
            label: <Profile />,
        },
        {
            key: 'logout',
            danger: true,
            label: (
                <Typography.Link
                    className={classNames(styles.linkItem, jost.className)}
                    onClick={async () => {
                        await dispatch(resetUserData())
                        localStorage.clear()
                        router.push('/')
                    }}
                    type="danger">
                    LOGOUT
                </Typography.Link>
            ),
        },
    ]

    useEffect(() => {
        handleResize()
        handleGetFeatures()

        dispatch(setActiveLoginForm('login'))
    }, [])

    return (
        <Row>
            <Col span={20} pull={2} push={2}>
                <Flex className={styles.navigationWrapper} justify="space-between" align="center">
                    <Flex className={styles.headerContainer} justify="center" align="center" gap={10}>
                        <Image src={logo} alt="loginForm" />
                        <span>
                            <Link href="/">SOLITUDE</Link>
                        </span>
                    </Flex>
                    <div className={styles.navigation}>
                        {renderMenuItem('products')}
                        {renderMenuItem('brands')}
                        {isLoggedIn && renderMenuItem('account')}
                        <Flex className={styles.icons} gap={20}>
                            {/* {renderSearch()} */}
                            {renderLogin()}
                            {/* <Image
                                    src={darkMode ? moon : sun}
                                    alt="darkmode"
                                    onClick={() => dispatch(setDarkMode(!darkMode))}
                                    width={100}
                                    height={100}
                                /> */}
                        </Flex>
                    </div>
                    <div className={styles.navigationMobile}>
                        <MenuOutlined
                            onClick={() => setOpen(true)}
                            className={styles.navigationIcon}
                            height={1000}
                            width={1000}
                        />
                        <Drawer
                            title={
                                <Flex justify="center">
                                    <Flex justify="center" align="center" style={{ flex: 1 }}>
                                        <Image src={logo} alt="loginForm" width={20} height={20} />
                                    </Flex>
                                    {renderSearch()}
                                </Flex>
                            }
                            placement="right"
                            onClose={() => setOpen(false)}
                            open={open}>
                            <Flex vertical gap={30}>
                                {renderMenuItem('products')}
                                {renderMenuItem('brands')}
                                {isLoggedIn && renderMenuItem('account')}
                            </Flex>
                        </Drawer>
                    </div>
                </Flex>
            </Col>
        </Row>
    )
}

export default Navigation
