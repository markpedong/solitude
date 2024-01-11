import { ModalFormProps } from '@ant-design/pro-components'

export const MODAL_FORM_PROPS: ModalFormProps = {
    labelCol: { flex: '30px' },
    layout: 'vertical',
    width: 800,
    modalProps: {
        destroyOnClose: true,
        maskClosable: false,
    },
    wrapperCol: { flex: 1 },
    autoFocusFirstInput: true,
    preserve: false,
    size: 'large',
}

export const PRODUCT_FILTER = [
    {
        label: 'all materials',
        value: 'materials',
        options: {
            fabric: 'fabric',
            cotton: 'cotton',
        },
    },
    {
        label: 'any gender',
        value: 'gender',
        options: {
            male: 'male',
            female: 'female',
        },
    },
    {
        label: 'in stock',
        value: 'stock',
        options: {
            allstock: 'allstock',
            out: 'out',
            available: 'available',
        },
    },
    {
        label: 'any type',
        value: 'type',
        options: {
            clothes: 'clothes',
            accessories: 'accessories',
        },
    },
    {
        label: 'price',
        value: 'price',
    },
]
