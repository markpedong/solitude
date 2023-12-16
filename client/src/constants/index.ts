import { ModalFormProps } from '@ant-design/pro-components'

export const MODAL_FORM_PROPS: ModalFormProps = {
    labelCol: { flex: '110px' },
    layout: 'horizontal',
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
