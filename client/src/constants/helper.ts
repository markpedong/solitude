import type { ProFormInstance, ActionType } from '@ant-design/pro-components'
import { message } from 'antd'
import dayjs from 'dayjs'
import { MutableRefObject } from 'react'
import numeral from 'numeral'

export const REQUIRED = [
	{
		required: true
	}
]

export const INPUT_NOSPACE = [
	{
		validator: (_, value) => (!value?.includes(' ') ? Promise.resolve() : Promise.reject(new Error('No spaces allowed')))
	}
]

export const INPUT_NUMBERS = [
	{
		validator: (_, value) => {
			const onlyNumbersRegex = /^[0-9]+$/
			return onlyNumbersRegex.test(value) ? Promise.resolve() : Promise.reject(new Error('Only numbers allowed'))
		}
	}
]

export const afterModalformFinish = (actionRef: MutableRefObject<ActionType>, msg: string, success: boolean, formRef?: MutableRefObject<ProFormInstance>) => {
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
}

export const capFrstLtr = (str: string) => str?.charAt(0).toUpperCase() + str?.slice(1)

export const dateParser = (date: number, format: string = 'MM/DD/YYYY') => (date ? dayjs.unix(date).format(format) : '')

export const numSuffix = (n: number) => numeral(n).format('0.0a')

export const numComma = (n: number) => numeral(n).format('0,0')
