'use client'

import { TVariations, TProduct } from '@/api'
import { Col, Divider, Flex, Row, Image as IM, Input, Button, Tag } from 'antd'
import React, { FC, memo, useCallback, useMemo, useState } from 'react'
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
}

const { CheckableTag } = Tag

const ProductDetails: FC<Props> = memo(({ data }) => {
    const variations = data?.variations?.flatMap(q => q.value?.map(q => q))
    console.log("data", data?.variations)
    const [firstImage, setFirstImage] = useState(data?.image?.[0])
    const [stock, setStock] = useState(1)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const handleAddStock = () =>
        setStock(q => {
            if (q < 2) {
                return q
            } else {
                return q - 1
            }
        })

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)
        console.log('You are interested in: ', nextSelectedTags)
        setSelectedTags(nextSelectedTags)
    }

    const memoizedFirstImage = useMemo(
        () => (
            <Col span={10} className={styles.productImageContainer}>
                <span className={classNames(styles.variant, jostHeavy.className)}>
                    {`/${data?.categories?.[0]}`} {data?.categories?.[1] && `/${data?.categories?.[1]}`}
                </span>
                <div className={styles.firstImageContainer}>
                    <IM src={firstImage} alt="product_image" width={200} height={200} />
                </div>
                <Flex className={styles.extraImagesContainer}>
                    {data?.image?.map((q, i) => (
                        <motion.div whileHover={{ scale: 1.2 }} onHoverStart={() => setFirstImage(q)} key={i}>
                            <Image src={q} alt="extra_images" width={70} height={70} />
                        </motion.div>
                    ))}
                </Flex>
            </Col>
        ),
        [firstImage]
    )

    const memoizedDescription = useMemo(() => {
        return (
            <Col span={20} className={styles.productDescriptionContainer}>
                <p className={classNames(jost.className, styles.productDescription)}>{data?.description}</p>
            </Col>
        )
    }, [])

    console.log('DATA', data)
    return (
        <Row justify="center">
            {memoizedFirstImage}
            <Col span={10} className={classNames(styles.productTitlePriceContainer, cormorant.className)}>
                <p className={classNames(styles.productTitle)}>{data?.product_name}</p>
                <p className={classNames(jost.className, styles.productPrice)}>₱ {data?.price}</p>
                <Flex className={styles.addingStockContainer} align="center">
                    <motion.div whileTap={{ scale: 0.9 }} onClick={handleAddStock}>
                        <MinusCircleOutlined />
                    </motion.div>
                    <Input variant="outlined" value={stock} onChange={e => setStock(+e.target.value)} />
                    <motion.div whileTap={{ scale: 0.9 }} onClick={() => setStock(q => q + 1)}>
                        <PlusCircleOutlined />
                    </motion.div>
                </Flex>
                <p className={classNames(jost.className, styles.productStock)}>Stocks Available: {data?.stock}</p>
                {data?.variations?.map(q => (
                    <div className={styles.tagContainer}>
                        <Flex key={q.id} align='center'>
                        <span className={styles.tagLabel}>{q?.label}:</span>
                            {q?.value?.map(tag => (
                               <motion.div whileTap={{scale: 0.9}} >
                                 <CheckableTag
                                    key={tag}
                                    checked={selectedTags.includes(tag)}
                                    onChange={checked => handleChange(tag, checked)}
                                    className={styles.tag}
                                    >
                                    {tag}
                                </CheckableTag>
                               </motion.div>
                            ))}
                        </Flex>
                    </div>
                ))}
                <Flex className={styles.addToCartBuyNowContainer} align="center">
                    <Button>ADD TO CART</Button>
                    <Button type="primary">BUY NOW</Button>
                </Flex>
            </Col>
            {memoizedDescription}
        </Row>
    )
})

export default ProductDetails
