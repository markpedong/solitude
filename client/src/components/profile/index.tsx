'use client'

import { getUserData, updateUserData } from '@/api'
import { INPUT_NOSPACE, REQUIRED, afterModalformFinish } from '@/constants/helper'
import { setUserData } from '@/redux/features/userSlice'
import { useAppSelector } from '@/redux/store'
import {
    ActionType,
    ModalForm,
    ProForm,
    ProFormDatePicker,
    ProFormInstance,
    ProFormRadio,
    ProFormText,
} from '@ant-design/pro-components'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Jost } from 'next/font/google'
import { FC, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'
import { Button } from 'antd'

const jost = Jost({ weight: '400', subsets: ['latin'] })

const Profile: FC = () => {
    const { userData, sellerData, type } = useAppSelector(state => state.userData)
    const actionRef = useRef<ActionType>()
    const formRef = useRef<ProFormInstance>()
    const dispatch = useDispatch()

    return (
        <ModalForm
            grid
            formRef={formRef}
            autoFocusFirstInput={false}
            initialValues={
                type === 1
                    ? {
                          ...userData,
                          password: '',
                          birthday: !!userData?.birthday ? userData?.birthday : dayjs().format('MM-DD-YYYY'),
                      }
                    : { ...sellerData }
            }
            trigger={<a className={classNames(styles.linkItem, jost.className)}>ACCOUNT</a>}
            title={<span className={classNames(jost.className, styles.profileTitle)}>Your Information</span>}
            submitter={{
                resetButtonProps: false,
                render: () => [
                    <Button type="primary" onClick={() => formRef?.current.submit()}>
                        Submit
                    </Button>,
                ],
            }}
            onFinish={async params => {
                const update = await updateUserData({ ...params, id: userData?.id })

                if (update?.success) {
                    const user = await getUserData({ id: userData?.id })
                    await dispatch(setUserData(user?.data))
                }

                return afterModalformFinish(actionRef, update.message, update.success, formRef)
            }}>
            {type === 1 ? (
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
            ) : (
                <ProFormText
                    name="seller_name"
                    placeholder="YOUR STORE NAME"
                    label="Store Name"
                    colProps={{ span: 8 }}
                    fieldProps={{ maxLength: 10 }}
                    rules={[...REQUIRED]}
                />
            )}
            <ProForm.Group>
                <ProFormText label="Email Address" name="email" placeholder="your@email.com" colProps={{ span: 12 }} />
                <ProFormText label="Username" name="username" placeholder="Your Username" colProps={{ span: 12 }} />
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
        </ModalForm>
    )
}

export default Profile
