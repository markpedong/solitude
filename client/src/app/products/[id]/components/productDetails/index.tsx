'use client'

import { TProduct } from '@/api'
import { Col, Divider, Flex, Row, Image as IM } from 'antd'
import React, { FC, memo, useState } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Cormorant } from 'next/font/google'
import { motion } from 'framer-motion'

const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })

type Props = {
    data: TProduct
    // list: TProduct[]
}

const ProductDetails: FC<Props> = ({ data }) => {
    console.log('DATA:', data)
    const [firstImage, setFirstImage] = useState(data?.image?.[0])

    return (
        <Row justify="center">
            <Col span={10} className={styles.productImageContainer}>
                <div className={styles.firstImageContainer}>
                    <IM src={firstImage} alt="product_image" width={200} height={200} />
                </div>
                <Flex className={styles.extraImagesContainer}>
                    {data?.image?.slice(1)?.map(q => (
                        <motion.div whileHover={{ scale: 1.2 }} onHoverStart={() => setFirstImage(q)}>
                            <Image src={q} alt="extra_images" width={70} height={70} />
                        </motion.div>
                    ))}
                </Flex>
            </Col>
            <Col span={10}>
                <span>{data?.product_name}</span>
            </Col>
        </Row>
    )
}

export default memo(ProductDetails)
