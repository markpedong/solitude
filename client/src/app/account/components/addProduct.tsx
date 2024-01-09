import { Col, Flex, Input, Row, Space } from 'antd'
import React, { FC } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { jost } from '@/app/page'
import Image from 'next/image'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { DeleteOutlined } from '@ant-design/icons'

type Props = {}

const AddProduct: FC = () => {
    return (
        <Row className={styles.addProductWrapper}>
            <Col span={12}>
                <span className={classNames(styles.addProductHeader, jost.className)}>Main Information</span>
                <Flex className={styles.addProductInformation} align="center">
                    <Image
                        src="https://random.imagecdn.app/150/150?random=965622"
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
            </Col>
            <Col span={1} />
            <Col span={11}>
                <Input.Search />
                <Flex className={styles.allProducts}>
                    <Image
                        src="https://random.imagecdn.app/150/150?random=965622"
                        alt="product_image"
                        width={1000}
                        height={1000}
                    />
                    <div className={classNames(styles.allProductDescription, jost.className)}>
                        <span>GOLDSMITHS</span>
                        <span>White Gold 1.20cttw Diamond Line</span>
                        <span>₱ 2,500.00</span>
                    </div>
                    <DeleteOutlined />
                </Flex>
            </Col>
        </Row>
    )
}

export default AddProduct
