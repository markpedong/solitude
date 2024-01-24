import { message } from 'antd'
import { MutableRefObject } from 'react'

export const INPUT_NOSPACE = [
    { required: true },
    {
        validator: (_, value) =>
            !value?.includes(' ') ? Promise.resolve() : Promise.reject(new Error('No spaces allowed')),
    },
]

export const afterModalformFinish = (actionRef: MutableRefObject<any>, msg: string, success: boolean) => {
    if (actionRef) {
        actionRef?.current?.reload()
    }

    if (!success) {
        message.error(msg)
        return
    }

    if (success && msg) {
        message.success(msg)
    }

    return success
}
