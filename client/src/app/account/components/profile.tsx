'use client'

import { INPUT_NOSPACE, afterModalformFinish } from '@/constants/helper'
import { useAppSelector } from '@/redux/store'
import { ActionType, ProForm, ProFormDatePicker, ProFormInstance, ProFormRadio, ProFormText } from '@ant-design/pro-components'
import { Col, Row } from 'antd'
import classNames from 'classnames'
import { Jost } from 'next/font/google'
import { FC, useRef } from 'react'
import styles from './styles.module.scss'
import { updateUserData } from '@/api'

const jost = Jost({ weight: '400', subsets: ['latin'] })

const Profile: FC = () => {
    const { userData } = useAppSelector(state => state.userData)
    const actionRef = useRef<ActionType>()
    const formRef = useRef<ProFormInstance>()

    return (
        <Row className={styles.profileWrapper}>
            <Col span={24}>
                <span className={classNames(jost.className, styles.profileHeader)}>Your Information</span>
                <ProForm
                    grid
                    formRef={formRef}
                    autoFocusFirstInput={false}
                    initialValues={{ ...userData, password: '' }}
                    submitter={{
                        resetButtonProps: false,
                    }}
                    onFinish={async params => {
                        console.log(params)
                        const res = await updateUserData({...params, id: userData?.id})

                        formRef?.current.resetFields()
                        return afterModalformFinish(actionRef, res.message, res.success)
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
                    <ProFormText
                        label="Email Address"
                        name="email"
                        placeholder="your@email.com"
                        colProps={{ span: 12 }}
                    />
                    <ProFormText label="Username" name="username" placeholder="Your Username" colProps={{ span: 12 }} />
                    <ProFormText.Password
                        label="Password"
                        name="password"
                        placeholder="Enter Password"
                        colProps={{ span: 12 }}
                        rules={[...INPUT_NOSPACE, { min: 6 }]}
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
                    <ProForm.Group>
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
                        colProps={{span: 12}}
                    />
                    <ProFormDatePicker
                        label="Birthday"
                        name="birthday"
                        placeholder="MONTH"
                        width="xl"
                        fieldProps={{ variant: 'outlined' }}
                        colProps={{span: 12}}
                    />
                    </ProForm.Group>
                </ProForm>
            </Col>
            {/* <Col span={1} /> */}
            {/* <Col span={11}>
                <Flex className={jost.className} justify="center" align="start" vertical gap={20}>
                    <span className={styles.extraContentHeader}>Solitude Emails</span>
                    <span className={styles.extraDescription}>
                        By joining our email list, you will be the first to know about exciting new designs, special
                        events, store openings and much more.
                    </span>
                    <Checkbox className={styles.extraFooter}>Check the box to subscribe to our newsletter</Checkbox>
                </Flex>
            </Col> */}
        </Row>
    )
}

export default Profile
