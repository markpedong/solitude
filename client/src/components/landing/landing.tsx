'use client'

import Image from 'next/image'
import landing from '@/public/assets/landing.png'
import { FC } from 'react'
import styles from './styles.module.scss'
import { Flex } from 'antd'

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
        </div>
    )
}

export default Landing
