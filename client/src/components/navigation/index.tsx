'use client'

import { TProduct, getProducts, userLogin, userSignup } from '@/api'
import { MODAL_FORM_PROPS } from '@/constants'
import { INPUT_NOSPACE, REQUIRED, afterModalformFinish } from '@/constants/helper'
import forgotModalCover from '@/public/assets/forgotModalCover.webp'
import loginModalCover from '@/public/assets/loginModalCover.webp'
import logo from '@/public/assets/logo.webp'
import signUpModalCover from '@/public/assets/signUpModalCover.webp'
import { setActiveLoginForm } from '@/redux/features/booleanSlice'
import { setUserData } from '@/redux/features/userSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setLocalStorage } from '@/utils/xLocalStorage'
import {
    LockOutlined,
    MenuOutlined,
    PhoneOutlined,
    RightOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { ActionType, ModalForm, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { Button, Col, Drawer, Flex, Input, Row, Typography } from 'antd'
import { Jost } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Collection } from '../reusable'
import styles from './styles.module.scss'

const jost = Jost({ weight: '400', subsets: ['latin'] })

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
    const dispatch = useDispatch<AppDispatch>()
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState<TProduct[]>([])
    const [searchFilter, setSearchFilter] = useState('')
    const { activeLoginForm } = useAppSelector(state => state.boolean)
    const formRef = useRef<ProFormInstance>()
    const actionRef = useRef<ActionType>()
    const router = useRouter()
    const create = activeLoginForm === 'create'
    const forgot = activeLoginForm === 'forgot'
    const login = activeLoginForm === 'login'

    const filteredProducts = useMemo(() => {
        return products?.filter(product => product.product_name.toLowerCase().includes(searchFilter))
    }, [products, searchFilter])

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
        const res = await getProducts({})

        setProducts(res.data)
    }

    const handleSearch = e => {
        const value = e.target.value.toLowerCase()
        setSearchFilter(value)
    }

    const handleLoginRegister = () => {
        if (login) {
            dispatch(setActiveLoginForm('create'))
        } else {
            dispatch(setActiveLoginForm('login'))
        }
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

    const handleFinish = async params => {
        let res

        if (create) {
            res = await userSignup(params)
        }

        if (login) {
            res = await userLogin(params)
            console.log('res: ', res)
        }

        dispatch(setUserData(res?.data))
        setLocalStorage('token', res?.token)
        router.push('/account')
        return afterModalformFinish(actionRef, res.message, res.success)
    }

    const renderLogin = () => (
        <ModalForm
            trigger={<UserOutlined />}
            submitter={false}
            width={create ? 1000 : 600}
            modalProps={{ style: { top: create ? '5%' : '10%' }, destroyOnClose: true, maskClosable: false }}
            grid={true}
            formRef={formRef}
            preserve={false}
            onFinish={handleFinish}>
            <Flex
                className={styles.loginContainer}
                justify="space-between"
                gap={20}
                style={{ blockSize: create ? '29rem' : forgot ? '22rem' : '26rem' }}>
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
                        {create && (
                            <ProForm.Group>
                                <ProFormText
                                    name="first_name"
                                    placeholder="eg: John"
                                    label="First Name"
                                    fieldProps={{
                                        prefix: <UserOutlined />,
                                    }}
                                    colProps={{ span: 8 }}
                                />
                                <ProFormText
                                    name="last_name"
                                    placeholder="eg: Smith"
                                    label="Last Name"
                                    colProps={{ span: 8 }}
                                />
                                <ProFormText
                                    name="phone"
                                    placeholder="+63 9*********"
                                    label="Phone Number"
                                    fieldProps={{ prefix: <PhoneOutlined /> }}
                                    colProps={{ span: 8 }}
                                />
                            </ProForm.Group>
                        )}
                        <ProForm.Group>
                            <ProFormText
                                name="email"
                                placeholder="your@email.com"
                                label="Email Address"
                                fieldProps={{ prefix: <UserOutlined /> }}
                                colProps={create ? { span: 12 } : {}}
                                rules={INPUT_NOSPACE}
                            />
                            {create && (
                                <ProFormText
                                    name="username"
                                    placeholder="eg: johnsmith"
                                    label="Username"
                                    colProps={{ span: 12 }}
                                />
                            )}
                        </ProForm.Group>
                        {!forgot && (
                            <ProForm.Group>
                                <ProFormText.Password
                                    name="password"
                                    placeholder="Enter Password"
                                    label="Password"
                                    fieldProps={{ prefix: <LockOutlined /> }}
                                    colProps={create ? { span: 12 } : {}}
                                    rules={[...REQUIRED, ...INPUT_NOSPACE, { min: 6 }]}
                                />
                                {create && (
                                    <ProFormText.Password
                                        name="confirm_password"
                                        placeholder="Re-enter Password"
                                        label="Confirm Password"
                                        colProps={{ span: 12 }}
                                        dependencies={['password']}
                                        rules={[
                                            ...REQUIRED,
                                            ...INPUT_NOSPACE,
                                            { min: 6 },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject(new Error('The passwords do not match'))
                                                },
                                            }),
                                        ]}
                                    />
                                )}
                            </ProForm.Group>
                        )}
                        {!forgot && !create && (
                            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                                <Typography.Link
                                    type="secondary"
                                    onClick={() => {
                                        dispatch(setActiveLoginForm('forgot'))
                                    }}>
                                    Forgot Password?
                                </Typography.Link>
                            </div>
                        )}
                    </div>
                    <Flex style={{ height: '100%' }} justify="end" vertical>
                        <Button
                            className={create ? styles.loginButton : ''}
                            style={{
                                marginBlockStart: create ? '2rem' : forgot ? '0.4rem' : '2rem',
                            }}
                            type="primary"
                            onClick={() => formRef.current?.submit()}>
                            {create ? 'SIGN IN' : forgot ? 'RECOVER YOUR ACCOUNT' : 'LOGIN'}
                        </Button>
                        <Flex className={styles.createAccountContainer} justify="center" align="center">
                            <Typography.Link type="secondary" onClick={handleLoginRegister}>
                                {create ? 'SIGN IN TO ACCOUNT' : 'CREATE AN ACCOUNT'}
                            </Typography.Link>
                            <RightOutlined onClick={handleLoginRegister} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </ModalForm>
    )

    useEffect(() => {
        handleResize()
        handleGetFeatures()

        dispatch(setActiveLoginForm('create'))
    }, [])

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
