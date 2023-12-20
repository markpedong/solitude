'use client'

import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { productsData } from '@/constants/testdata'
import { Card } from 'antd'

const Products: FC = () => {
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
                    {productsData.map(q => (
                        <div className={styles.item}>
                            <Card
                                style={{ width: 240 }}
                                cover={<img src={q.image} alt="example" />}
                                bordered={false}
                                hoverable>
                                <Card.Meta
                                    title={<div className={styles.cardTitle}>{q.name}</div>}
                                    description={
                                        <>
                                            <div className={styles.cardDescription}>{q.description}</div>
                                            <div className={styles.cardFooter}>{q.price}</div>
                                        </>
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
