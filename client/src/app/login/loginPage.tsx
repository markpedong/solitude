'use client'

import { ProForm, ProFormText } from '@ant-design/pro-components'
import React, { FC } from 'react'
import styles from './styles.module.scss'

const LoginPage: FC = () => {
    return (
        <div className={styles.loginContainer}>
            <ProForm
                onFinish={async params => {
                    console.log('parameters', params)
                }}>
                <ProFormText label="username" name="username" />
                <ProFormText.Password label="username" name="password" />
            </ProForm>
        </div>
    )
}

export default LoginPage
