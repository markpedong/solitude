import { message } from 'antd'

export const messageHelper = (res: any) => {
	message.destroy()

	if (res?.success){
		message.success(res?.message)
		return
	}

	if (!!!res?.success){
		message.error(res?.message)
		return
	}

	return
}
