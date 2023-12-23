'use client'

import landing from '@/public/assets/landing.png'
import { Flex } from 'antd'
import Image from 'next/image'
import { FC } from 'react'
import styles from './styles.module.scss'

const Landing: FC = () => {
    return (
        <div>
            <div className={styles.headerContainerText}>
                <span>Find products for your friends, family, and special occasions.</span>
            </div>
            <div className={styles.landingImageContainer}>
                <Image src={landing} alt="landing" />
            </div>
            <Flex className={styles.landingButtonContainer} justify="center" align="center" gap={20} vertical>
                <span>SEARCH PRODUCTS</span>
                <span>READ OUR CARE GUIDE</span>
            </Flex>
            <Flex className={styles.featuredContainer} justify="center" align="center" vertical>
                <span>Featured Products</span>
                <span>Essential products, best values, lower prices</span>
            </Flex>
        </div>
    )
}

export default Landing
