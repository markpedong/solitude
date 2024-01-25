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

export const throttleAlert = (msg: string) => throttle(message.error(msg), 1500, { trailing: false })

const post = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
    const token = getLocalStorage('token')
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { token: String(token)?.replaceAll(`"`, '') } : {}),
            },
            body: JSON.stringify(data) || '{}',
        })
        const result = await response.json()

        if (!result?.success) {
            throw new Error(JSON.stringify({ success: false, message: result.message, status: result.status }))
        }

        return result as ApiResponse<T>
    } catch (err) {
        throttleAlert(err.message?.message)
        return { success: false, message: err.message, status: err.status }
    }
}

const get = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}${stringify(data) ? '?' + stringify(data) : ''}`,
        {
            method: 'GET',
        }
    )
    const result = await response.json()

    return result as ApiResponse<T>
}

export { get, post }
