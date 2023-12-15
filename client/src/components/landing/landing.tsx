'use client'

import Image from 'next/image'
import landing from '@/public/assets/landing-image.webp'
import { FC } from 'react'

const Landing: FC = () => {
    return (
        <div>
            <div className="">
                <Image src={landing} alt="landing" />
            </div>
        </div>
    )
}

export default Landing
