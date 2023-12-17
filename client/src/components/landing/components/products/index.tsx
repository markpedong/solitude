'use client'

import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { Card } from 'antd'

const Products: FC = () => {
    const [width, setWidth] = useState(0)
    const carousel = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setWidth(carousel.current!.scrollWidth - carousel.current!.offsetWidth)
    }, [])

    return (
        <div className={styles.productWrapper}>
            <motion.div className={styles.carousel} ref={carousel}>
                <motion.div className={styles.innerCarousel} drag="x" dragConstraints={{ right: 0, left: -width }}>
                    <motion.div className={styles.item}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            }>
                            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            }>
                            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            }>
                            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            }>
                            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            }>
                            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </motion.div>
                    <motion.div className={styles.item}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            }>
                            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Products
