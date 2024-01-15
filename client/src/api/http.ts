import { stringify } from 'qs'

type ApiResponse<T> = {
    data: T
    message: string
    success: boolean
    status: number
}

const post = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: stringify(data),
    })
    const result = await response.json()

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
