import { stringify } from 'qs'
import { throttle } from 'lodash'
import { message } from 'antd'
import { getLocalStorage } from '@/utils/xLocalStorage'

type ApiResponse<T> = {
    data?: T | any
    message: string
    success: boolean
    status: number
}

export const throttleAlert = (msg: string) => throttle(message.error(msg), 1500, { trailing: false, leading: true })

const upload = async <T>(url: string, data): Promise<ApiResponse<T>> => {
    const token = getLocalStorage('token')
    const form = new FormData()

    form.append('file', data)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            ...(token ? { token: String(token)?.replaceAll(`"`, '') } : {}),
        },
        body: form,
    })
    //prettier-ignore
    const result = await res.json() as ApiResponse<T>

    if (result?.status !== 200) {
        throttleAlert(result?.message)
        return result
    }

    return result as ApiResponse<T>
}

const post = async <T>(url: string, data = {}, client = true): Promise<ApiResponse<T>> => {
    const token = getLocalStorage('token')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { token: String(token)?.replaceAll(`"`, '') } : {}),
        },
        body: JSON.stringify(data) || '{}',
    })
    //prettier-ignore
    const res = await api.json() as ApiResponse<T>

    if (res?.status !== 200 && client) {
        throttleAlert(res?.message)
        return res
    }

    return res as ApiResponse<T>
}

const get = async <T>(url: string, data = {}, client = true): Promise<ApiResponse<T>> => {
    const token = getLocalStorage('token')
    const api =  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}${stringify(data) ? '?' + stringify(data) : ''}`, {
        method: 'GET',
        headers: {
            ...(token ? { token: String(token)?.replaceAll(`"`, '') } : {}),
        },
    })
     //prettier-ignore
     const res = await api.json() as ApiResponse<T>

     if (res?.status !== 200 && client) {
        throttleAlert(res?.message)
        return res
    }
    
     return res as ApiResponse<T>
}

export { get, post, upload }
