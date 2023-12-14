'use client'

import { login } from '@/api/index'
import loginModalCover from '@/public/assets/loginModalCover.png'
import logo from '@/public/assets/logo.png'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { CloseOutlined, LockOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Button, Checkbox, Flex, Typography } from 'antd'
import Image from 'next/image'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'

const Login: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const activeModal = useAppSelector(state => state.boolean.activeLoginModal)

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
                            }}
                        />
                    </Flex>
                    <Flex className={styles.loginHeader} justify="center" align="center" gap={10}>
                        <Image src={logo} alt="loginForm" />
                        <span>SOLITUDE</span>
                    </Flex>
                    <div className={styles.formContainer}>
                        <ProForm
                            submitter={false}
                            onFinish={async params => {
                                const data = await login({ ...params })

                                console.log('response: ', data.data)
                            }}>
                            <ProFormText
                                name="email"
                                placeholder="your@email.com"
                                label="Email Address"
                                fieldProps={{ prefix: <UserOutlined />, autoFocus: false }}
                            />
                            <ProFormText.Password
                                name="password"
                                placeholder="Enter Password"
                                label="Password"
                                fieldProps={{ prefix: <LockOutlined /> }}
                            />
                            <Typography.Link type="secondary">Forgot Password</Typography.Link>
                        </ProForm>
                    </div>
                    <Button type="primary">LOGIN</Button>
                    <Flex className={styles.createAccountContainer} justify="center">
                        <Typography.Text>CREATE AN ACCOUNT </Typography.Text>
                        <RightOutlined />
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}

export default Login
