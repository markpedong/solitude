import { TProduct, addProduct, uploadImages } from '@/api'
import {
    ActionType,
    ProForm,
    ProFormDigit,
    ProFormInstance,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from '@ant-design/pro-components'
import { Button, Col, Flex, Row, Spin, Upload, UploadFile, message } from 'antd'
import classNames from 'classnames'
import { Jost } from 'next/font/google'
import Image from 'next/image'
import { FC, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { afterModalformFinish } from '@/constants/helper'
import { omit } from 'lodash'
import { useAppSelector } from '@/redux/store'

const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
    products: TProduct[]
}

const AddProduct: FC<Props> = ({ products }) => {
    const [uploading, setUploading] = useState(false)
    const { userData , sellerData} = useAppSelector(state => state.userData)
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
                    <span className={classNames(jost.className, styles.addProductHeader)}>ADD PRODUCT</span>
                    <ProFormText label="Name" name="product_name" placeholder="Product Name" colProps={{ span: 24 }} />
                    <ProFormTextArea
                        label="Description"
                        name="description"
                        placeholder="Description"
                        colProps={{ span: 24 }}
                    />
                    <ProForm.Group>
                        <ProFormText label="Price" name="price" placeholder="Price" colProps={{ span: 12 }} />
                        <ProFormDigit
                            label="Amount in Stock"
                            name="stock"
                            placeholder="in Stock"
                            colProps={{ span: 12 }}
                        />
                    </ProForm.Group>
                    <ProFormSelect
                        label="Category"
                        name="categories"
                        placeholder="Please enter Category for Products eg: Clothing, Shoes, Accessories"
                        fieldProps={{
                            maxTagCount: 10,
                            mode: 'tags',
                            allowClear: false,
                            variant: 'outlined'
                        }}
                    />
                    <Flex justify="center" gap={20}>
                        <motion.div whileTap={{ scale: 0.9 }}>
                            <Button onClick={() => formRef?.current.resetFields()}>Reset</Button>
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
