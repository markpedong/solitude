import { MODAL_FORM_PROPS } from '@/constants/index'
import { SearchOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-components'
import { FC } from 'react'

const Search: FC = () => {
    return (
        <ModalForm
            {...MODAL_FORM_PROPS}
            title="SEARCH FOR A PRODUCT"
            trigger={<SearchOutlined />}
            submitter={false}></ModalForm>
    )
}

export default Search
