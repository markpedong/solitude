import { TProduct } from '@/api'
import {
    ProForm,
    ProFormDigit,
    ProFormInstance,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from '@ant-design/pro-components'
import { Button, Col, Flex, Row } from 'antd'
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
    const [uploadedImages, setUploadedImages] = useState<string[]>([])
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
                                    src={uploadedImages?.[0]}
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
                            data-length={0}>
                            {uploadedImages?.map((q, i) => (
                                <Image src={q} alt="product_image" width={1000} height={1000} key={i} priority />
                            ))}
                            <ProFormUploadButton
                                name="upload"
                                fieldProps={{
                                    name: 'file',
                                    listType: 'picture-card',
                                }}
                                title="UPLOAD YOUR IMAGE"
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
