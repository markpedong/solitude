import { stringify } from 'qs'
import { throttle } from 'lodash'
import { getLocalStorage } from '@/utils/xLocalStorage'
import { clearUserData } from '@/constants/helper'
import { redirect } from 'next/navigation'

type ApiResponse<T> = {
	data?: T
	message: string
	success: boolean
	status: number
}

export const throttleAlert = (msg: string) => throttle(() => console.error(msg), 1500, { trailing: false, leading: true })

const upload = async <T>(url: string, data): Promise<ApiResponse<T>> => {
	const token = getLocalStorage('token')
	const form = new FormData()

	form.append('file', data)

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
		method: 'POST',
		headers: {
			...(token ? { token: String(token)?.replaceAll(`"`, '') } : {})
		},
		body: form
	})
	//prettier-ignore
	const result = await response.json() as ApiResponse<T>

	if (result?.status !== 200) {
		if (response?.status === 401) {
			clearUserData()
		}

		throttleAlert(result?.message)
		return result
	}

	return result as ApiResponse<T>
}

const post = async <T>(url: string, data = {}, client = true): Promise<ApiResponse<T>> => {
	const token = getLocalStorage('token')
	const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token ? { token: String(token)?.replaceAll(`"`, '') } : {})
		},
		body: JSON.stringify(data) || '{}'
	})
	//prettier-ignore
	const response = await apiResponse.json() as ApiResponse<T>

	if (response?.status !== 200) {
		throttleAlert(response.message)

		if (response?.status === 401) {
			redirect('/unauthorized')
		}
		return
	}

	return response as ApiResponse<T>
}

const get = async <T>(url: string, data = {}, client = true): Promise<ApiResponse<T>> => {
	const token = getLocalStorage('token')
	const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}${stringify(data) ? '?' + stringify(data) : ''}`, {
		method: 'GET',
		headers: {
			...(token ? { token: String(token)?.replaceAll(`"`, '') } : {})
		}
	})
	//prettier-ignore
	const response = await apiResponse.json() as ApiResponse<T>
	
	if (response?.status !== 200) {
		throttleAlert(response.message)

		if (response?.status === 401) {
			redirect('/unauthorized')
		}
		return
	}

	return response as ApiResponse<T>
}

export { get, post, upload }
