'use client'

import { ProForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Checkbox, Col, Flex, Row, Space } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import styles from './styles.module.scss'
import { Jost } from 'next/font/google'
import { INPUT_NOSPACE, REQUIRED } from '@/constants/helper'
import { useAppSelector } from '@/redux/store'

const jost = Jost({ weight: '400', subsets: ['latin'] })

const Profile: FC = () => {
    const { userData } = useAppSelector(state => state.userData)

    return (
        <Row className={styles.profileWrapper}>
            <Col span={12}>
                <span className={classNames(jost.className, styles.profileHeader)}>Your Information</span>
                <ProForm
                    grid
                    autoFocusFirstInput={false}
                    initialValues={{ ...userData, password: '' }}
                    submitter={{
                        resetButtonProps: false,
                    }}
                    onFinish={async params => {
                        console.log(params)
                        console.log(userData)
                    }}>
                    <ProForm.Group>
                        <ProFormText
                            label="First Name"
                            name="first_name"
                            placeholder="eg: John"
                            colProps={{ span: 12 }}
                            rules={[...INPUT_NOSPACE]}
                        />
                        <ProFormText
                            label="Last Name"
                            name="last_name"
                            placeholder="eg: Smith"
                            colProps={{ span: 12 }}
                            rules={[...INPUT_NOSPACE]}
                        />
                    </ProForm.Group>
                    <ProFormText label="Username" name="username" placeholder="Your Username" colProps={{ span: 12 }} />
                    <ProFormText.Password
                        label="Password"
                        name="password"
                        placeholder="Enter Password"
                        colProps={{ span: 12 }}
                        rules={[...INPUT_NOSPACE, { min: 6 }]}
                    />
                    <ProFormText
                        label="Email Address"
                        name="email"
                        placeholder="your@email.com"
                        colProps={{ span: 12 }}
                    />
                    <ProFormText.Password
                        label="Confirm Password"
                        name="confirm_password"
                        placeholder="Enter Password"
                        colProps={{ span: 12 }}
                        dependencies={['password']}
                        rules={[
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
                    <ProFormRadio.Group
                        label="Gender"
                        name="gender"
                        options={[
                            {
                                label: 'Male',
                                value: 'male',
                            },
                            {
                                label: 'Female',
                                value: 'female',
                            },
                            {
                                label: `I'd rather not say`,
                                value: 'n/a',
                            },
                        ]}
                    />
                    <ProFormText label="Birthday">
                        <Space direction="horizontal">
                            <ProFormSelect name="month" colProps={{ span: 4 }} placeholder="MONTH" />
                            <ProFormSelect name="day" colProps={{ span: 4 }} placeholder="DAY" />
                            <ProFormSelect name="year" colProps={{ span: 4 }} placeholder="YEAR" />
                        </Space>
                    </ProFormText>
                </ProForm>
            </Col>
            <Col span={1} />
            <Col span={11}>
                <Flex className={jost.className} justify="center" align="start" vertical gap={20}>
                    <span className={styles.extraContentHeader}>Solitude Emails</span>
                    <span className={styles.extraDescription}>
                        By joining our email list, you will be the first to know about exciting new designs, special
                        events, store openings and much more.
                    </span>
                    <Checkbox className={styles.extraFooter}>Check the box to subscribe to our newsletter</Checkbox>
                </Flex>
            </Col>
        </Row>
    )
}

export default Profile
