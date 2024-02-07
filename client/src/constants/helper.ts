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

    if (formRef && success) {
        formRef?.current?.resetFields()
    }

    if (success && msg) {
        message.success(msg)
    }

    return success
}

export const clearUserData = () => {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i]
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }

    caches.keys().then(keys => {
        keys.forEach(key => caches.delete(key))
    })
    indexedDB.databases().then(dbs => {
        dbs.forEach(db => indexedDB.deleteDatabase(db.name))
    })

    localStorage.clear()
    sessionStorage.clear()


    setTimeout(() => {
        window.location.assign('/')
    }, 1500)
}
