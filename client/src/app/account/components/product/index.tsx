import { TProduct } from '@/api'
import { ProForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components'
import { Col, Flex, Row } from 'antd'
import classNames from 'classnames'
import { Jost } from 'next/font/google'
import Image from 'next/image'
import { FC } from 'react'
import styles from './styles.module.scss'

const jost = Jost({ weight: '400', subsets: ['latin'] })

type Props = {
    products: TProduct[]
}

const AddProduct: FC<Props> = ({ products }) => {
    return (
        <Row className={styles.addProductWrapper}>
            <Col span={13} className={styles.productContainer}>
                <span className={classNames(styles.addProductHeader, jost.className)}>Gallery</span>
                <Flex className={styles.productFront} vertical align="center">
                    <Image
                        src="https://res.cloudinary.com/dyjxuqnn9/image/upload/v1705887851/products/r8cujachll2hhls6iebd.jpg"
                        alt="product_image"
                        width={100}
                        height={100}
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
            </Col>
            <Col span={11}>
                <Flex className={styles.addProductInformation} align="center" vertical>
                    <span className={classNames(styles.addProductHeader, jost.className)}>Product Details</span>
                    <div>
                        <ProForm
                            grid
                            autoFocusFirstInput={false}
                            submitter={{
                                resetButtonProps: false,
                            }}
                            onFinish={async params => {
                                console.log('params: ', params)
                            }}>
                            <ProFormText label="Name" name="name" placeholder="Product Name" colProps={{ span: 24 }} />
                            <ProFormTextArea
                                label="Description"
                                name="description"
                                placeholder="Description"
                                colProps={{ span: 24 }}
                            />
                            <ProFormText label="Price" name="price" placeholder="Price" colProps={{ span: 12 }} />
                            <ProFormDigit
                                label="Amount in Stock"
                                name="stock"
                                placeholder="in Stock"
                                colProps={{ span: 12 }}
                            />
                        </ProForm>
                    </div>
                </Flex>
            </Col>
        </Row>
    )
}

export default AddProduct
