import { addProduct, uploadImages } from '@/api'
import { REQUIRED, afterModalformFinish } from '@/constants/helper'
import { useAppSelector } from '@/redux/store'
import {
    ActionType,
    ProForm,
    ProFormDigit,
    ProFormInstance,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from '@ant-design/pro-components'
import { Button, Flex, Spin, UploadFile } from 'antd'
import { motion } from 'framer-motion'
import { FC, useRef, useState } from 'react'
import styles from './styles.module.scss'

type Props = {}

const AddProduct: FC<Props> = () => {
    const [uploading, setUploading] = useState(false)
    const { sellerData } = useAppSelector(state => state.userData)
    const [uploadedImages, setUploadedImages] = useState<UploadFile<any>[]>([])
    const formRef = useRef<ProFormInstance>()
    const actionRef = useRef<ActionType>()

    return (
        <div className={styles.addProductWrapper}>
            <ProForm
                grid
                autoFocusFirstInput={false}
                submitter={false}
                formRef={formRef}
                onFinish={async params => {
                    const res = await addProduct({
                        ...params,
                        product_id: sellerData.seller_id,
                        price: +params.price,
                        image: uploadedImages?.map(q => q.url),
                    })

                    if (res.success) {
                        setUploadedImages([])
                    }

                    return afterModalformFinish(actionRef, res.message, res.success, formRef)
                }}>
                <ProFormText colProps={{ span: 10 }}>
                    <Flex className={styles.galleryContainer} justify="center" align="center">
                        {uploading ? (
                            <Spin />
                        ) : (
                            <ProFormUploadButton
                                name="upload"
                                title="UPLOAD YOUR IMAGE"
                                fieldProps={{
                                    name: 'files',
                                    listType: 'picture-card',
                                    accept: 'image/*',
                                    multiple: true,
                                    fileList: uploadedImages,
                                    action: async e => {
                                        setUploading(true)
                                        setUploadedImages([])

                                        try {
                                            const res = await uploadImages(e)
                                            setUploadedImages(state => [...state, res.data])

                                            return ''
                                        } finally {
                                            setUploading(false)
                                        }
                                    },
                                }}
                            />
                        )}
                    </Flex>
                </ProFormText>
                <ProFormText colProps={{ span: 14 }}>
                    <ProFormText
                        label="Name"
                        name="product_name"
                        placeholder="Product Name"
                        colProps={{ span: 24 }}
                        rules={[...REQUIRED]}
                    />
                    <ProFormTextArea
                        label="Description"
                        name="description"
                        placeholder="Description"
                        colProps={{ span: 24 }}
                        rules={[...REQUIRED]}
                    />
                    <ProForm.Group>
                        <ProFormText
                            label="Price"
                            name="price"
                            placeholder="Price"
                            colProps={{ span: 12 }}
                            rules={[...REQUIRED]}
                        />
                        <ProFormDigit
                            label="Amount in Stock"
                            name="stock"
                            placeholder="in Stock"
                            colProps={{ span: 12 }}
                            rules={[...REQUIRED]}
                        />
                    </ProForm.Group>
                    {/* <ProFormSelect
                        label="Category"
                        name="categories"
                        placeholder="Please enter Category for Products eg: Clothing, Shoes, Accessories"
                        fieldProps={{
                            maxTagCount: 10,
                            mode: 'tags',
                            allowClear: false,
                            variant: 'outlined',
                        }}
                    /> */}
                    <Flex justify="center" gap={20}>
                        <motion.div whileTap={{ scale: 0.9 }}>
                            <Button onClick={() => formRef?.current?.resetFields()}>Reset</Button>
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.9 }}>
                            <Button type="primary" onClick={() => formRef?.current.submit()}>
                                Submit
                            </Button>
                        </motion.div>
                    </Flex>
                </ProFormText>
            </ProForm>
        </div>
    )
}

export default AddProduct
