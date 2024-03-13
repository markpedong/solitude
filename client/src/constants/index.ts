import { ModalFormProps } from '@ant-design/pro-components'

export const MODAL_FORM_PROPS: ModalFormProps = {
	labelCol: { flex: '30px' },
	layout: 'vertical',
	width: 800,
	modalProps: {
		destroyOnClose: true,
		maskClosable: false
	},
	wrapperCol: { flex: 1 },
	autoFocusFirstInput: true,
	preserve: false,
	size: 'large'
}

export const PRODUCT_FILTER = [
	{
		label: 'all materials',
		value: 'material',
		options: {
			fabric: 'fabric',
			cotton: 'cotton'
		}
	},
	{
		label: 'any gender',
		value: 'gender',
		options: {
			male: 'male',
			female: 'female'
		}
	},
	{
		label: 'in stock',
		value: 'stock',
		options: {
			allstock: 'allstock',
			out: 'out',
			available: 'available'
		}
	},
	{
		label: 'any type',
		value: 'type',
		options: {
			clothes: 'clothes',
			accessories: 'accessories'
		}
	},
	{
		label: 'price',
		value: 'price',
		options: {
			'0-500': 500,
			'500-1000': 1000,
			'1000+': 1001
		}
	}
]

export const FILTER = {
	1: 'Most Popular',
	2: 'Top Selling',
	3: 'Relevance'
}

export enum USER_TYPES {
	USER = 1,
	SELLER
}

export const scaleSizeSm = { scale: 0.7 }

export const scaleSize = { scale: 0.9 }

export const scaleSizeBig = { scale: 1.1 }

export const ADDRESS_TYPE = [
	{ label: 'Default Address', value: 1 },
	{ label: 'Pickup Address', value: 2 },
	{ label: 'Return Address', value: 3 }
]

export const ORDER_STATUS = {
	1: "PENDING",
	2: "PROCESSING",
	3: "ON DELIVERY",
	4: "COMPLETED"
}

export const COLOR_STATUS = {
	1: "rgba(153, 153, 153, 1)",
	2: "rgba(251, 142, 41, 1)",
	3: "rgba(255, 221, 134, 1)",
	4:"rgba(20, 225, 62, 1)"
}