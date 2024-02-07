'use client'

import { USER_TYPES } from '@/constants'
import { afterModalformFinish } from '@/constants/helper'
import { useAppSelector } from '@/redux/store'
import {
    ActionType,
    ModalForm,
    ProFormInstance
} from '@ant-design/pro-components'
import { Button } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Jost } from 'next/font/google'
import { FC, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import ModalProfile from './modalProfile'
import styles from './styles.module.scss'
import { getSellerData, getUserData, updateSellerData, updateUserData } from '@/api'
import { setSellerData, setUserData } from '@/redux/features/userSlice'

const jost = Jost({ weight: '400', subsets: ['latin'] })


const Profile: FC = () => {
    const { userData, sellerData, type } = useAppSelector(state => state.userData)
    const [imageUrl, setImageUrl] = useState<string>()
    const actionRef = useRef<ActionType>()
    const formRef = useRef<ProFormInstance>()
    const dispatch = useDispatch()

    return (
        <ModalForm
            grid
            formRef={formRef}
            autoFocusFirstInput={false}
            initialValues={
                type === USER_TYPES.USER
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
                let res

                console.log("params: ",params)
                if (type === USER_TYPES.USER) {
                    res = await updateUserData({ ...params, id: userData?.id })
                } else {
                    res = await updateSellerData({ ...params, avatar: imageUrl, seller_id: sellerData?.seller_id })
                }

                if (res?.success && type === USER_TYPES.USER) {
                    const user = await getUserData({ id: userData?.id })
                    await dispatch(setUserData(user?.data))
                }

                if (res?.success && type === USER_TYPES.SELLER) {
                    const user = await getSellerData({ seller_id: sellerData?.seller_id })
                    await dispatch(setSellerData(user?.data))
                }

                return afterModalformFinish(actionRef, res.message, res.success)
            }}>
            <ModalProfile imageUrl={imageUrl} setImageUrl={setImageUrl}/>
        </ModalForm>
    )
}

export default Profile
