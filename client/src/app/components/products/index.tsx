'use client'

import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { Card, Flex } from 'antd'
import { TProduct } from '@/api'

const Products: FC<{ data: TProduct[] }> = ({ data }) => {
    const [width, setWidth] = useState(0)
    const carousel = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateWidth = () => {
            if (carousel.current) {
                setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
            }
        }

        updateWidth()

        window.addEventListener('resize', updateWidth)

        return () => window.removeEventListener('resize', updateWidth)
    }, [])

    return (
        <div className={styles.productWrapper}>
            <motion.div className={styles.carousel} ref={carousel}>
                <motion.div
                    className={styles.innerCarousel}
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    whileTap={{ cursor: 'grabbing' }}>
                    {data.map(q => (
                        <div className={styles.item} key={q.id}>
                            <Card
                                className={styles.itemContainer}
                                cover={<img src={q.image} alt="example" />}
                                bordered={false}
                                hoverable
                                style={{ padding: 0 }}>
                                <Card.Meta
                                    style={{ padding: 0 }}
                                    title={<div className={styles.cardTitle}>{q.product_name}</div>}
                                    description={
                                        <Flex vertical>
                                            <div className={styles.cardDescription}>{q.description}</div>
                                            <div className={styles.cardFooter}>$ {q.price.toFixed(2)}</div>
                                        </Flex>
                                    }
                                />
                            </Card>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Products
