import { stringify } from 'qs'
import { throttle } from 'lodash'
import { message } from 'antd'

type ApiResponse<T> = {
    data: T
    message: string
    success: boolean
    status: number
}

export const throttleAlert = (msg: string) => throttle(message.error(msg), 1500, {trailing: false})

const post = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) || '{}',
    })
    const result = await response.json()
    
    if (!result.success){
        throttleAlert(result?.message)
        return result
    }

    return result as ApiResponse<T>
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
