'use client'

import { Card } from 'antd'
import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import Product from '@/components/products'

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
                    <Product
                        description="White Gold 1.20cttw Diamond Line"
                        image="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        price="£2,500.00"
                        title="GOLDSMITHS"
                    />
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            style={{ width: 240 }}
                            cover={
                                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="example" />
                            }
                            bordered={false}>
                            <Card.Meta
                                title={<div className={styles.cardTitle}>GOLDSMITHS</div>}
                                description={
                                    <>
                                        <div className={styles.cardDescription}>White Gold 1.20cttw Diamond Line</div>
                                        <div className={styles.cardFooter}>£2,500.00</div>
                                    </>
                                }
                            />
                        </Card>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Products
