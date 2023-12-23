import { MODAL_FORM_PROPS } from '@/constants/index'
import { SearchOutlined } from '@ant-design/icons'
import { ModalForm } from '@ant-design/pro-components'
import { Input } from 'antd'
import { FC } from 'react'

const Search: FC = () => {
    return (
        <ModalForm {...MODAL_FORM_PROPS} title="SEARCH FOR A PRODUCT" trigger={<SearchOutlined />} submitter={false}>
            <Input placeholder="eg. Sweater, T-Shirts, Shorts" />
        </ModalForm>
    )
}

export default Search
