'use client'

import Image from 'next/image'
import landing from '@/public/assets/landing.png'
import { FC } from 'react'
import styles from './styles.module.scss'

const Landing: FC = () => {
    return (
        <div>
            <div className={styles.landingImageContainer}>
                <Image src={landing} alt="landing" />
            </div>
        </div>
    )
}

export default Landing
