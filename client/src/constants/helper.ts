import { message } from 'antd'

export const INPUT_NOSPACE = [
    { required: true },
    {
        validator: (_, value) =>
            !value?.includes(' ') ? Promise.resolve() : Promise.reject(new Error('No spaces allowed')),
    },
]

export const afterModalformFinish = (actionRef, msg, boolean = true) => {
    if (actionRef) {
        actionRef?.current?.reload()
    }

    if (boolean) {
        message.error(msg)
    }

    if (msg) {
        message.success(msg)
    }

    return boolean
}
