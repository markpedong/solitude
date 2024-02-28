import { message } from 'antd'

export const messageHelper = (msg: string) => {
	message.destroy()
	message.success(msg)
	return
}
