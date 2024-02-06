'use client'

import { TVariations, TProduct } from '@/api'
import { Col, Divider, Flex, Row, Image as IM, Input, Button } from 'antd'
import React, { FC, memo, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Cormorant, Jost } from 'next/font/google'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

const cormorant = Cormorant({ weight: '600', subsets: ['latin'] })
const jost = Jost({ weight: '400', subsets: ['latin'] })
const jostHeavy = Jost({ weight: '500', subsets: ['latin'] })

type Props = {
    data: TProduct
    variants: TVariations[]
    // list: TProduct[]
}

const ProductDetails: FC<Props> = ({ data, variants }) => {
    const [firstImage, setFirstImage] = useState(data?.image?.[0])
    const [stock, setStock] = useState(1)

    const memoizedElement = useMemo(() => {
        return (
            <Row justify="center">
                <Col span={10} className={styles.productImageContainer}>
                    <span className={classNames(styles.variant, jostHeavy.className)}>/ Sample Category / Sub Category</span>
                    <div className={styles.firstImageContainer}>
                        <IM src={firstImage} alt="product_image" width={200} height={200} />
                    </div>
                    <Flex className={styles.extraImagesContainer}>
                        {data?.image?.slice(1)?.map((q, i) => (
                            <motion.div whileHover={{ scale: 1.2 }} onHoverStart={() => setFirstImage(q)} key={i}>
                                <Image src={q} alt="extra_images" width={70} height={70} />
                            </motion.div>
                        ))}
                    </Flex>
                </Col>
                <Col span={10} className={classNames(styles.productTitlePriceContainer, cormorant.className)}>
                    <p className={classNames(styles.productTitle)}>{data?.product_name}</p>
                    <p className={classNames(jost.className, styles.productPrice)}>₱ {data?.price}</p>
                    <Flex className={styles.addingStockContainer} align="center">
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                                setStock(q => {
                                    if (q  < 2) {
                                        return q
                                    } else {
                                        return q - 1
                                    }
                                })
                            }>
                            <MinusCircleOutlined />
                        </motion.div>
                        <Input
                            variant="outlined"
                            value={stock}
                            onChange={e => {
                                console.log(e.target)
                                setStock(+e.target.value)
                            }}
                        />
                        <motion.div whileTap={{ scale: 0.9 }} onClick={() => setStock(q => q + 1)}>
                            <PlusCircleOutlined />
                        </motion.div>
                    </Flex>
                    <p className={classNames(jost.className, styles.productStock)}>Stocks Available: {data?.stock}</p>
                    <Flex className={styles.addToCartBuyNowContainer} align='center'>
                        <Button>ADD TO CART</Button>
                        <Button type='primary'>BUY NOW</Button>
                    </Flex>
                </Col>
                <Col span={20} className={styles.productDescriptionContainer}>
                    <p className={classNames(jost.className, styles.productDescription)}>{data?.description}</p>
                </Col>
            </Row>
        )
    }, [data, stock])

    return memoizedElement
}

export default memo(ProductDetails)
