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
        value: 'material',
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
        options: {
            '0-500': 500,
            '500-1000': 1000,
            '1000+': 1001,
        },
    },
]

export const INPUT_NOSPACE = [
    { required: true },
    {
        validator: (_, value) =>
            !value.includes(' ') ? Promise.resolve() : Promise.reject(new Error('No spaces allowed')),
    },
]
