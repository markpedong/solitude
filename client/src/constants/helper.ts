import { getLocalStorage } from '@/utils/xLocalStorage'
import { message } from 'antd'
import { MutableRefObject } from 'react'

export const REQUIRED = [
    {
        required: true,
    },
]

export const INPUT_NOSPACE = [
    {
        validator: (_, value) =>
            !value?.includes(' ') ? Promise.resolve() : Promise.reject(new Error('No spaces allowed')),
    },
]

export const afterModalformFinish = (actionRef: MutableRefObject<any>, msg: string, success: boolean) => {
    if (actionRef) {
        actionRef?.current?.reload()
    }

    if (success && msg) {
        message.success(msg)
    }

    return success
}

export const isLoggedIn = () => !!getLocalStorage('token')
