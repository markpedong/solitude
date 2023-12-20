'use client'

import Product from '@/components/products'
import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { productsData } from '@/constants/testdata'

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
                        <Product description={q.description} image={q.image} price={q.price} title={q.name} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Products
