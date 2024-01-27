import { stringify } from 'qs'
import { throttle } from 'lodash'
import { message } from 'antd'
import { getLocalStorage } from '@/utils/xLocalStorage'

type ApiResponse<T> = {
    data?: T
    message: string
    success: boolean
    status: number
}

export const throttleAlert = (msg: string) => throttle(message.error(msg), 1500, { trailing: false, leading: true })

const post = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
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
    const result = await res.json() as ApiResponse<T>

    if (result?.status !== 200) {
        throttleAlert(result?.message)
        return result
    }

    return result as ApiResponse<T>
}

const get = async <T>(url: string, data = {}): Promise<ApiResponse<T>> =>
    await (
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}${stringify(data) ? '?' + stringify(data) : ''}`, {
            method: 'GET',
            next: { revalidate: 6000 },
        })
    ).json()

export { get, post }
