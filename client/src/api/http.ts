import { message } from 'antd'
import { stringify } from 'qs'

type ApiResponse<T = null> = {
    data: T
    message: string
    success: boolean
    status: number
}

const post = async (url: string, data = {}): Promise<ApiResponse> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    const result = (await response.json()) as ApiResponse

    if (result.status > 200) {
        message.error(result.message)
    } else {
        message.success(result.message)
    }

    return result
}

const get = async (url: string, data = {}): Promise<ApiResponse> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}${stringify(data) ? '?' + stringify(data) : ''}`
    )
    const result = await response.json()

    return result
}

export { post, get }
