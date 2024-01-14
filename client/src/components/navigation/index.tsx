'use client'

import { TProduct, getProducts } from '@/api'
import { jost } from '@/app/page'
import { MODAL_FORM_PROPS } from '@/constants'
import forgotModalCover from '@/public/assets/forgotModalCover.webp'
import loginModalCover from '@/public/assets/loginModalCover.webp'
import logo from '@/public/assets/logo.webp'
import signUpModalCover from '@/public/assets/signUpModalCover.webp'
import { setActiveLoginForm } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import {
    LockOutlined,
    MenuOutlined,
    PhoneOutlined,
    RightOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components'
import { Button, Col, Drawer, Flex, Input, Row, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { CSSProperties, FC, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Collection from '../collections'
import styles from './styles.module.scss'

const MenuItem: FC<{ url: string }> = ({ url }) => (
    <a className={styles.menuItem} href={url}>
        {url}
    </a>
)

const searchStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
}

const Navigation: FC = () => {
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState<TProduct[]>([])
    const [searchFilter, setSearchFilter] = useState('')
    const loginForm = useAppSelector(state => state.boolean.activeLoginForm)
    const create = loginForm === 'create'
    const forgot = loginForm === 'forgot'
    const dispatch = useDispatch<AppDispatch>()

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
                title={<span className={jost.className}>SEARCH FOR A PRODUCT</span>}
                trigger={<SearchOutlined />}
                submitter={false}
                style={{ height: 300, overflowY: 'auto' }}>
                <div style={searchStyle}>
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

    const renderLogin = () => (
        <ModalForm trigger={<UserOutlined />} submitter={false} width={600}>
            <Flex
                className={styles.loginContainer}
                justify="space-between"
                gap={20}
                style={{ blockSize: create ? '38rem' : forgot ? '20rem' : '30rem' }}>
                <div className={styles.loginImage}>
                    <Image
                        alt="loginCover"
                        src={create ? signUpModalCover : forgot ? forgotModalCover : loginModalCover}
                    />
                </div>
                <Flex className={styles.loginForm} vertical>
                    <Flex className={styles.loginHeader} justify="center" align="center" gap={10}>
                        <Image src={logo} alt="loginForm" />
                        <span>SOLITUDE</span>
                    </Flex>
                    <Flex className={styles.loginHeaderText} justify="center" vertical>
                        <h1 className={jost.className}>
                            {create
                                ? 'Create an Account'
                                : forgot
                                ? 'Forgotten your Password?'
                                : `Hello, Let's Sign In`}
                        </h1>
                        <span>
                            {create
                                ? 'Register New Solitude Account'
                                : forgot
                                ? 'Enter your email to recover your Account!'
                                : 'Please register or sign in'}
                        </span>
                    </Flex>
                    <div
                        className={styles.formContainer}
                        style={{
                            margin: `${forgot ? '2.5rem' : '3.5rem'} 0 0.5rem 0`,
                        }}>
                        <ProForm
                            submitter={false}
                            onFinish={async params => {
                                // const data = await login({ ...params })

                                console.log('params: ', params)
                            }}>
                            {create && (
                                <Flex gap={10}>
                                    <ProFormText
                                        name="first_name"
                                        placeholder="eg: John"
                                        label="First Name"
                                        fieldProps={{ prefix: <UserOutlined />, autoFocus: false }}
                                    />
                                    <ProFormText
                                        name="last_name"
                                        placeholder="eg: Smith"
                                        label="Last Name"
                                        fieldProps={{ autoFocus: false }}
                                    />
                                </Flex>
                            )}
                            <ProFormText
                                name="email"
                                placeholder="your@email.com"
                                label="Email Address"
                                fieldProps={{ prefix: <UserOutlined />, autoFocus: false }}
                            />
                            {create && (
                                <ProFormText
                                    name="phone"
                                    placeholder="+63 9*********"
                                    label="Phone Number"
                                    fieldProps={{ prefix: <PhoneOutlined />, autoFocus: false }}
                                />
                            )}
                            {!forgot && (
                                <ProFormText.Password
                                    name="password"
                                    placeholder="Enter Password"
                                    label="Password"
                                    fieldProps={{ prefix: <LockOutlined /> }}
                                />
                            )}
                            {!forgot && (
                                <Typography.Link
                                    type="secondary"
                                    onClick={() => {
                                        dispatch(setActiveLoginForm('forgot'))
                                    }}>
                                    Forgot Password?
                                </Typography.Link>
                            )}
                        </ProForm>
                    </div>
                    <Button
                        className={create ? styles.loginButton : ''}
                        style={{
                            marginBlockStart: create ? '2rem' : forgot ? '0.4rem' : '2rem',
                        }}
                        type="primary">
                        {create ? 'SIGN IN' : forgot ? 'RECOVER YOUR ACCOUNT' : 'LOGIN'}
                    </Button>
                    <Flex className={styles.createAccountContainer} justify="center">
                        <Typography.Link
                            type="secondary"
                            onClick={() => {
                                if (loginForm === 'login') {
                                    dispatch(setActiveLoginForm('create'))
                                } else {
                                    dispatch(setActiveLoginForm('login'))
                                }
                            }}>
                            {create ? 'SIGN IN TO ACCOUNT' : 'CREATE AN ACCOUNT'}
                        </Typography.Link>
                        <RightOutlined />
                    </Flex>
                </Flex>
            </Flex>
        </ModalForm>
    )

    return (
        <>
            <Row>
                <Col xs={2} lg={2} />
                <Col xs={20} lg={20}>
                    <Flex className={styles.navigationWrapper} justify="space-between" align="center">
                        <Flex className={styles.headerContainer} justify="center" align="center" gap={10}>
                            <Image src={logo} alt="loginForm" />
                            <span>
                                <Link href="/">SOLITUDE</Link>
                            </span>
                        </Flex>
                        <div className={styles.navigation}>
                            <MenuItem url="products" />
                            <MenuItem url="brands" />
                            <MenuItem url="deals" />
                            <MenuItem url="services" />
                            <Flex className={styles.icons} gap={20}>
                                {renderSearch()}
                                {renderLogin()}
                            </Flex>
                        </div>
                        <div className={styles.navigationMobile}>
                            <MenuOutlined
                                onClick={showDrawer}
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
                </Col>
                <Col xs={2} lg={2} />
            </Row>
        </>
    )
}

export default Navigation
