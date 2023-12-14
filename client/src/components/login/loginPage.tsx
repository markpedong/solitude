'use client'

import { login } from '@/api/index'
import loginModalCover from '@/public/assets/loginModalCover.png'
import signUpModalCover from '@/public/assets/signUpModalCover.png'
import forgotModalCover from '@/public/assets/forgotModalCover.png'
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
    const create = loginForm === 'create'
    const forgot = loginForm === 'forgot'

    return (
        <div className={styles.loginWrapper}>
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
                        <h1>
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
                            marginBlockStart: create ? '3rem' : forgot ? '0.4rem' : '2rem',
                        }}
                        type="primary">
                        {create ? 'SIGN IN' : forgot ? 'RECOVER YOUR ACCOUNT' : 'LOGIN'}
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
                            {create ? 'SIGN IN TO ACCOUNT' : 'CREATE AN ACCOUNT'}
                        </Typography.Text>
                        <RightOutlined />
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}

export default Login
