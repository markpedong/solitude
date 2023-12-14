'use client'

import { login } from '@/api/index'
import loginModalCover from '@/public/assets/loginModalCover.png'
import logo from '@/public/assets/logo.png'
import { setActiveLoginForm, setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { CloseOutlined, LockOutlined, PhoneOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Button, Flex, Typography } from 'antd'
import Image from 'next/image'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'

const Login: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const loginForm = useAppSelector(state => state.boolean.activeLoginForm)

    return (
        <div className={styles.loginWrapper}>
            <Flex className={styles.loginContainer} justify="space-between" gap={20}>
                <div className={styles.loginImage}>
                    <Image alt="loginCover" src={loginModalCover} />
                </div>
                <Flex className={styles.loginForm} vertical>
                    <Flex justify="end" className={styles.closeIcon}>
                        <CloseOutlined
                            onClick={() => {
                                dispatch(setActiveLoginModal(false))
                                dispatch(setActiveLoginForm('login'))
                            }}
                        />
                    </Flex>
                    <Flex className={styles.loginHeader} justify="center" align="center" gap={10}>
                        <Image src={logo} alt="loginForm" />
                        <span>SOLITUDE</span>
                    </Flex>
                    <Flex className={styles.loginHeaderText} justify="center" vertical>
                        <h1>{loginForm === 'login' ? `Hello, Let's Sign In` : 'Create an Account'}</h1>
                        <span>
                            {loginForm === 'login' ? 'Please register or sign in' : 'Register New Solitude Account'}
                        </span>
                    </Flex>
                    <div className={styles.formContainer}>
                        <ProForm
                            submitter={false}
                            onFinish={async params => {
                                // const data = await login({ ...params })

                                console.log('params: ', params)
                            }}>
                            {loginForm === 'create' && (
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
                            {loginForm === 'create' && (
                                <ProFormText
                                    name="phone"
                                    placeholder="+63 9*********"
                                    label="Phone Number"
                                    fieldProps={{ prefix: <PhoneOutlined />, autoFocus: false }}
                                />
                            )}
                            <ProFormText.Password
                                name="password"
                                placeholder="Enter Password"
                                label="Password"
                                fieldProps={{ prefix: <LockOutlined /> }}
                            />
                            {loginForm !== 'create' && (
                                <Typography.Link type="secondary">Forgot Password?</Typography.Link>
                            )}
                        </ProForm>
                    </div>
                    <Button className={loginForm === 'create' ? styles.loginButton : ''} type="primary">
                        {loginForm === 'create' ? 'SIGN IN' : 'LOGIN'}
                    </Button>
                    <Flex className={styles.createAccountContainer} justify="center">
                        <Typography.Text
                            onClick={() => {
                                if (loginForm === 'login') {
                                    dispatch(setActiveLoginForm('create'))
                                } else {
                                    dispatch(setActiveLoginForm('login'))
                                }
                            }}>
                            {loginForm === 'login' ? 'CREATE AN ACCOUNT' : 'SIGN IN TO ACCOUNT'}
                        </Typography.Text>
                        <RightOutlined />
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}

export default Login
