import { TProduct, uploadImages } from '@/api'
import {
    ProForm,
    ProFormDigit,
    ProFormInstance,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from '@ant-design/pro-components'
import { Button, Col, Flex, Row, Upload, message } from 'antd'
import classNames from 'classnames'
import { Jost } from 'next/font/google'
import Image from 'next/image'
import { FC, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'

const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
    products: TProduct[]
}

const AddProduct: FC<Props> = ({ products }) => {
    const [uploadedImages, setUploadedImages] = useState<{ url: string; fileName: string; size: number }[]>([])
    const formRef = useRef<ProFormInstance>()

    return (
        <div className={styles.addProductWrapper}>
            <ProForm
                grid
                autoFocusFirstInput={false}
                submitter={false}
                formRef={formRef}
                onFinish={async params => {
                    console.log('params: ', params)
                }}>
                <ProForm.Group>
                    <ProFormText colProps={{ span: 12 }}>
                        <Flex className={styles.productFront} vertical align="center">
                            {uploadedImages?.[0] && (
                                <Image
                                    src={uploadedImages?.[0].url}
                                    alt="product_image"
                                    width={200}
                                    height={200}
                                    priority
                                />
                            )}
                        </Flex>
                        <Flex
                            className={styles.galleryContainer}
                            justify="center"
                            align="center"
                            wrap="wrap"
                            data-length={uploadedImages?.length}>
                            {uploadedImages?.slice(1).map((q, i) => (
                                <Image src={q.url} alt="product_image" width={1000} height={1000} key={i} priority />
                            ))}
                            <ProFormUploadButton
                                name="upload"
                                fieldProps={{
                                    name: 'files',
                                    listType: 'picture-card',
                                    showUploadList: false,
                                    beforeUpload: file => {
                                        const isPNG = file.type === 'image/*'
                                        if (!isPNG) {
                                            message.error(`${file.name} is not an image file`)
                                        }
                                        return isPNG || Upload.LIST_IGNORE
                                    },
                                }}
                                title="UPLOAD YOUR IMAGE"
                                onChange={async e => {
                                    const form = new FormData()
                                    e.fileList.forEach(file => {
                                        form.append('files', file.originFileObj)
                                    })
                                    const res = await uploadImages(form)

                                    setUploadedImages(res?.data)
                                }}
                            />
                        </Flex>
                    </ProFormText>
                    <ProFormText colProps={{ span: 12 }}>
                        <ProFormText label="Name" name="name" placeholder="Product Name" colProps={{ span: 24 }} />
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
                    </ProFormText>
                </ProForm.Group>
            </ProForm>
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
        </div>
    )
}

export default AddProduct
