'use client'

import { login } from '@/api/index'
import loginModalCover from '@/public/assets/loginModalCover.png'
import logo from '@/public/assets/logo.png'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { CloseOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Button, Checkbox, Flex, Typography } from 'antd'
import Image from 'next/image'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'

const Login: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const activeModal = useAppSelector(state => state.boolean.activeLoginModal)

    return (
        <div className={styles.loginWrapper}>
            <Flex className={styles.loginContainer} justify="space-between" gap={20}>
                <div className={styles.loginImage}>
                    <Image alt="loginCover" src={loginModalCover} />
                </div>
                <Flex className={styles.loginForm} vertical align="flex-start" justify="space-between">
                    <CloseOutlined
                        className={styles.closeIcon}
                        onClick={() => {
                            dispatch(setActiveLoginModal(!activeModal))
                        }}
                    />
                    <Flex justify="center">
                        <h1>SOLITUDE</h1>
                        {/* <Image src={logo} alt="loginForm" /> */}
                    </Flex>
                    <div className={styles.formContainer}>
                        <ProForm
                            submitter={false}
                            onFinish={async params => {
                                const data = await login({ ...params })

                                console.log('response: ', data.data)
                            }}>
                            <ProFormText name="email" placeholder="Email" fieldProps={{ prefix: <UserOutlined /> }} />
                            <ProFormText.Password
                                name="password"
                                placeholder="Password"
                                fieldProps={{ prefix: <LockOutlined /> }}
                            />
                        </ProForm>
                    </div>
                    <Button type="primary">Login</Button>
                    <Flex>
                        <Checkbox>Remember me</Checkbox>
                        <Typography.Link>Forgot Password</Typography.Link>
                    </Flex>
                    <Typography.Text>
                        Or <Typography.Link>register now!</Typography.Link>
                    </Typography.Text>
                </Flex>
            </Flex>
        </div>
    )
}

export default Login
