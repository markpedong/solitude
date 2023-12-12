type ApiResponse = {
    data: any
    message: string
    success: boolean
    status: number
}

const post = async (url: string, data = {}): Promise<ApiResponse> => {
    const response = await fetch(`http://localhost:8080${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    const result = await response.json()

    return result
}

const get = async (url: string, data = {}): Promise<ApiResponse> => {
    const response = await fetch(`${url}?${new URLSearchParams(data).toString()}`)

    const result = await response.json()

    return result
}

export { post, get }
