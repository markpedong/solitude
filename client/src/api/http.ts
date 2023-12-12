type ApiResponse<T = null> = {
    data: any
}

const handleResponse = async (response: Response): Promise<ApiResponse> => {
    const data = await response.json()
    console.log('data', data)
    return { data }
}

const post = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    const result = await response.json()

    return result
}

// Ensure that handleResponse is properly defined to process the response

const get = async <T>(url: string, data = {}): Promise<ApiResponse<T>> => {
    const response = await fetch(`${url}?${new URLSearchParams(data).toString()}`)

    return handleResponse(response)
}

export { post, get }
