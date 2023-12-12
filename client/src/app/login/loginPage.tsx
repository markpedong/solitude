'use client'

import { login } from '@/api'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { FC } from 'react'
import styles from './styles.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Typography } from 'antd'

const LoginPage: FC = () => {
    return (
        <div className={styles.loginContainer}>
            <h1>SOLITUDE LOGIN</h1>
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
    )
}

export default LoginPage
