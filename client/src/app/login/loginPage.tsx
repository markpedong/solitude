'use client'

import { ProForm, ProFormText } from '@ant-design/pro-components'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import { login, signUp } from '@/api'
import { post } from '@/api/http'

const LoginPage: FC = () => {
    return (
        <div className={styles.loginContainer}>
            <ProForm
                onFinish={async params => {
                    const data = await login({ ...params })

                    console.log('response: ', data.data)
                }}>
                <ProFormText label="email" name="email" />
                <ProFormText.Password label="password" name="password" />
            </ProForm>
        </div>
    )
}

export default LoginPage
