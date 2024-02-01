'use client'

import { INPUT_NOSPACE, afterModalformFinish } from '@/constants/helper'
import { useAppSelector } from '@/redux/store'
import {
    ActionType,
    ProForm,
    ProFormDatePicker,
    ProFormInstance,
    ProFormRadio,
    ProFormText,
} from '@ant-design/pro-components'
import { Col, Row } from 'antd'
import classNames from 'classnames'
import { Jost } from 'next/font/google'
import { FC, useRef } from 'react'
import styles from './styles.module.scss'
import { getUserData, updateUserData } from '@/api'
import { useDispatch } from 'react-redux'
import { setUserData } from '@/redux/features/userSlice'
import dayjs from 'dayjs'
import { omit, omitBy } from 'lodash'

const jost = Jost({ weight: '400', subsets: ['latin'] })

const Profile: FC = () => {
    const { userData } = useAppSelector(state => state.userData)
    const actionRef = useRef<ActionType>()
    const formRef = useRef<ProFormInstance>()
    const dispatch = useDispatch()

    return (
        <Row className={styles.profileWrapper}>
            <Col span={24}>
                <span className={classNames(jost.className, styles.profileTitle)}>Your Information</span>
                <ProForm
                    grid
                    formRef={formRef}
                    autoFocusFirstInput={false}
                    initialValues={{
                        ...userData,
                        password: '',
                        birthday: !!userData.birthday ? userData.birthday : dayjs().format('MM-DD-YYYY'),
                    }}
                    submitter={{
                        resetButtonProps: false,
                    }}
                    onFinish={async params => {
                        const update = await updateUserData({ ...params, id: userData?.id })

                        if (update?.success) {
                            const user = await getUserData({ id: userData?.id })
                            await dispatch(setUserData(user?.data))
                        }

                        return afterModalformFinish(actionRef, update.message, update.success, formRef)
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
                    <ProForm.Group>
                        <ProFormText
                            label="Email Address"
                            name="email"
                            placeholder="your@email.com"
                            colProps={{ span: 12 }}
                        />
                        <ProFormText
                            label="Username"
                            name="username"
                            placeholder="Your Username"
                            colProps={{ span: 12 }}
                        />
                    </ProForm.Group>
                    <ProForm.Group>
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
                    </ProForm.Group>
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
                                    value: 'undefined',
                                },
                            ]}
                            colProps={{ span: 12 }}
                        />
                        <ProFormDatePicker
                            label="Birthday"
                            name="birthday"
                            placeholder="MONTH"
                            width="xl"
                            colProps={{ span: 12 }}
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
