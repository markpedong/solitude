import { Col, Flex, Input, Row, Space } from 'antd'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { ProForm, ProFormSelect, ProFormText, ProFormUploadButton } from '@ant-design/pro-components'
import { DeleteOutlined } from '@ant-design/icons'
import { TProduct } from '@/api'
import { Jost } from 'next/font/google'

const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
    products: TProduct[]
}

const AddProduct: FC<Props> = ({ products }) => {
    return (
        <Row className={styles.addProductWrapper}>
            <Col span={12}>
                <span className={classNames(styles.addProductHeader, jost.className)}>Main Information</span>
                <Flex className={styles.addProductInformation} align="center">
                    <Image
                        src="https://res.cloudinary.com/dyjxuqnn9/image/upload/v1705887851/products/r8cujachll2hhls6iebd.jpg"
                        alt="product_image"
                        width={1000}
                        height={1000}
                    />
                    <div>
                        <ProForm grid autoFocusFirstInput={false} submitter={false}>
                            <ProFormText label="Name" name="name" placeholder="Product Name" colProps={{ span: 12 }} />
                            <ProFormText label="Price" name="price" placeholder="Price" colProps={{ span: 12 }} />
                            <ProFormText
                                label="Description"
                                name="description"
                                placeholder="Description"
                                colProps={{ span: 24 }}
                            />
                        </ProForm>
                    </div>
                </Flex>
                <span className={classNames(styles.addProductHeader, jost.className)}>Gallery</span>
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
                <span className={classNames(jost.className, styles.profileHeader)}>Details</span>
                <ProForm
                    grid
                    autoFocusFirstInput={false}
                    submitter={{
                        resetButtonProps: false,
                    }}
                    onFinish={async params => {
                        console.log(params)
                    }}>
                    <ProFormText label="ID" name="id" placeholder="Product id" colProps={{ span: 12 }} />
                    <ProFormSelect
                        label="Amount in Stock"
                        name="stock"
                        placeholder="in Stock"
                        colProps={{ span: 12 }}
                    />
                    <ProFormSelect label="Body Part" name="part" placeholder="Part" colProps={{ span: 12 }} />
                    <ProFormSelect label="Material" name="material" placeholder="Material" colProps={{ span: 12 }} />
                    <ProFormSelect label="Gender" name="gender" placeholder="Gender" colProps={{ span: 12 }} />
                    <ProFormSelect label="Type" name="type" placeholder="Type" colProps={{ span: 12 }} />
                </ProForm>
            </Col>
            <Col span={1} />
            <Col span={11}>
                <Input.Search />
                <Space className={styles.allProductContainer} direction="vertical" size={10}>
                    {products?.slice(0, 5)?.map(q => {
                        return (
                            <Flex className={styles.allProducts}>
                                <Image src={q.image} alt="product_image" width={1000} height={1000} />
                                <div className={classNames(styles.allProductDescription, jost.className)}>
                                    <span>{q.product_name}</span>
                                    <span>{q.description}</span>
                                    <span>₱ {q.price?.toFixed(2)}</span>
                                </div>
                                <DeleteOutlined />
                            </Flex>
                        )
                    })}
                </Space>
            </Col>
        </Row>
    )
}

export default AddProduct
