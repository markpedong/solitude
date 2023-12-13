'use client'

import { login } from '@/api'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { FC } from 'react'
import styles from './styles.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { setActiveLoginModal } from '@/redux/features/booleanSlice'

const Login: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const activeModal = useAppSelector(state => state.boolean.activeLoginModal)

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <h1>SOLITUDE LOGIN</h1>
                <p
                    onClick={() => {
                        dispatch(setActiveLoginModal(!activeModal))
                    }}>
                    close modal
                </p>
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
                <div className={styles.passwordContainer}>
                    <Checkbox>Remember me</Checkbox>
                    <Typography.Link>Forgot Password</Typography.Link>
                </div>
                <Button type="primary">Login</Button>
                <Typography.Text>
                    Or <Typography.Link>register now!</Typography.Link>
                </Typography.Text>
            </div>
        </div>
    )
}

export default Login
