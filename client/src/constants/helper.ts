import type { ProFormInstance, ActionType } from '@ant-design/pro-components'
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

export const afterModalformFinish = (
    actionRef: MutableRefObject<ActionType>,
    msg: string,
    success: boolean,
    formRef?: MutableRefObject<ProFormInstance>
) => {
    if (actionRef) {
        actionRef?.current?.reload()
    }

    if (formRef) {
        formRef?.current?.resetFields()
    }

    if (success && msg) {
        message.success(msg)
    }

    return success
}
