'use client'

import { TProduct, getProducts, sellerLogin, sellerSignup, userLogin, userSignup } from '@/api'
import { MODAL_FORM_PROPS, USER_TYPES } from '@/constants'
import { INPUT_NOSPACE, REQUIRED, afterModalformFinish } from '@/constants/helper'
import forgotModalCover from '@/public/assets/forgotModalCover.webp'
import loginModalCover from '@/public/assets/loginModalCover.webp'
import logo from '@/public/assets/logo.webp'
import signUpModalCover from '@/public/assets/signUpModalCover.webp'
import sellerModalCover from '@/public/assets/sellerModalCover.webp'
import { setActiveLoginForm } from '@/redux/features/booleanSlice'
import { resetUserData, setUserToken, setUserData, setSellerData, setType } from '@/redux/features/userSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { getLocalStorage, setLocalStorage } from '@/utils/xLocalStorage'
import {
    LockOutlined,
    MenuOutlined,
    PhoneOutlined,
    RightOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { ActionType, ModalForm, ProForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import type { MenuProps } from 'antd'
import { Button, Col, Drawer, Dropdown, Flex, Input, Row, Typography } from 'antd'
import classNames from 'classnames'
import { Jost } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Collection } from '../reusable'
import styles from './styles.module.scss'
import Profile from '@/components/profile'

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
    const forgot = activeLoginForm === 'forgot'
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

    const handleLoginRegister = async () => {
        formRef?.current.resetFields()

        if (login || forgot) {
            await dispatch(setActiveLoginForm('create'))
            await dispatch(setType(1))
        } else {
            await dispatch(setActiveLoginForm('login'))
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
            formRef?.current.resetFields()
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
                        formRef?.current.resetFields()
                        dispatch(setActiveLoginForm('login'))
                    }
                }}
                onFinish={handleFinish}>
                <Flex
                    className={styles.loginContainer}
                    justify="space-between"
                    gap={20}
                    style={{ blockSize: create ? '34rem' : forgot ? '22rem' : '26rem' }}>
                    <div className={styles.loginImage}>
                        <Image
                            alt="loginCover"
                            src={
                                create
                                    ? signUpModalCover
                                    : forgot
                                    ? forgotModalCover
                                    : seller
                                    ? sellerModalCover
                                    : loginModalCover
                            }
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
                                    : seller
                                    ? 'Got any products? Post it Here!'
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
                                <ProFormSelect
                                    label="Type"
                                    fieldProps={{ defaultValue: 1, allowClear: false }}
                                    options={[
                                        { label: 'SELLER', value: 2 },
                                        { label: 'USER', value: 1 },
                                    ]}
                                    colProps={{ span: 7 }}
                                    placeholder=""
                                    onChange={e => {
                                        dispatch(setType(e))
                                        formRef?.current.resetFields([
                                            'email',
                                            'username',
                                            'first_name',
                                            'last_name',
                                            'password',
                                            'phone',
                                            'confirm_password',
                                        ])
                                    }}
                                />
                            )}
                            <ProForm.Group>
                                <ProFormText
                                    name="email"
                                    placeholder="your@email.com"
                                    label="Email Address"
                                    fieldProps={{ prefix: <UserOutlined /> }}
                                    colProps={create ? { span: 12 } : {}}
                                    rules={[
                                        ...REQUIRED,
                                        {
                                            type: 'email',
                                            message: 'input is not email format!',
                                        },
                                    ]}
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
                            {create && (
                                <ProForm.Group>
                                    {type === USER_TYPES.USER ? (
                                        <>
                                            <ProFormText
                                                name="first_name"
                                                placeholder="eg: John"
                                                label="First Name"
                                                fieldProps={{
                                                    prefix: <UserOutlined />,
                                                    maxLength: 10,
                                                }}
                                                colProps={{ span: 8 }}
                                                rules={[...REQUIRED]}
                                            />
                                            <ProFormText
                                                name="last_name"
                                                placeholder="eg: Smith"
                                                label="Last Name"
                                                colProps={{ span: 8 }}
                                                fieldProps={{ maxLength: 10 }}
                                                rules={[...REQUIRED]}
                                            />
                                        </>
                                    ) : (
                                        <ProFormText
                                            name="seller_name"
                                            placeholder="YOUR STORE NAME"
                                            label="Store Name"
                                            colProps={{ span: 8 }}
                                            fieldProps={{ maxLength: 10 }}
                                            rules={[...REQUIRED]}
                                        />
                                    )}
                                    <ProFormText
                                        name="phone"
                                        placeholder="+63 9*********"
                                        label="Phone Number"
                                        fieldProps={{ prefix: <PhoneOutlined /> }}
                                        colProps={{ span: 8 }}
                                    />
                                </ProForm.Group>
                            )}

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
                                <Flex justify="space-between">
                                    <Typography.Link
                                        type="secondary"
                                        onClick={() => {
                                            dispatch(setActiveLoginForm('seller'))
                                            formRef?.current.resetFields()
                                        }}>
                                        Seller? Click here
                                    </Typography.Link>
                                    <Typography.Link
                                        type="secondary"
                                        onClick={() => {
                                            dispatch(setActiveLoginForm('forgot'))
                                            formRef?.current.resetFields()
                                        }}>
                                        Forgot Password?
                                    </Typography.Link>
                                </Flex>
                            )}
                        </div>
                        <Flex style={{ height: '100%' }} justify="end" vertical>
                            <Button
                                className={create ? styles.loginButton : ''}
                                style={{
                                    marginBlockStart: create ? '2rem' : forgot ? '0.4rem' : '2rem',
                                }}
                                type="primary"
                                onClick={() => {
                                    formRef.current?.submit()
                                }}>
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
                        {renderMenuItem('deals')}
                        {isLoggedIn && renderMenuItem('account')}
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
                                {renderMenuItem('deals')}
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
