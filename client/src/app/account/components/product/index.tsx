import { TProduct } from '@/api'
import {
    ProForm,
    ProFormDigit,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormUploadButton,
} from '@ant-design/pro-components'
import { Button, Col, Flex, Row } from 'antd'
import classNames from 'classnames'
import { Jost } from 'next/font/google'
import Image from 'next/image'
import { FC } from 'react'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'

const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
    products: TProduct[]
}

const AddProduct: FC<Props> = ({ products }) => {
    return (
        <>
            <ProForm
                grid
                autoFocusFirstInput={false}
                submitter={false}
                onFinish={async params => {
                    console.log('params: ', params)
                }}>
                <ProForm.Group>
                    <ProFormText colProps={{ span: 12 }}>
                        <Flex className={styles.productFront} vertical align="center">
                            <Image
                                src="https://res.cloudinary.com/dyjxuqnn9/image/upload/v1705887851/products/r8cujachll2hhls6iebd.jpg"
                                alt="product_image"
                                width={200}
                                height={200}
                            />
                        </Flex>
                        <Flex className={styles.galleryContainer} justify="start" wrap="wrap">
                            {new Array(4)
                                .fill(
                                    'https://res.cloudinary.com/dyjxuqnn9/image/upload/v1705887851/products/r8cujachll2hhls6iebd.jpg'
                                )
                                ?.map(q => (
                                    <Image src={q} alt="product_image" width={1000} height={1000} />
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
                        <ProFormText label="Price" name="price" placeholder="Price" colProps={{ span: 24 }} />
                        <ProFormDigit
                            label="Amount in Stock"
                            name="stock"
                            placeholder="in Stock"
                            colProps={{ span: 24 }}
                        />
                    </ProFormText>
                </ProForm.Group>
            </ProForm>
            <Flex justify="center" gap={20}>
                <motion.div whileTap={{ scale: 0.9 }}>
                    <Button>Reset</Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.9 }}>
                    <Button type="primary">Submit</Button>
                </motion.div>
            </Flex>
        </>
    )
}

export default AddProduct
