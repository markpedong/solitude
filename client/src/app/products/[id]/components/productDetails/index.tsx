'use client'

import { TProduct } from '@/api'
import { Col, Divider, Flex, Row } from 'antd'
import React, { FC, memo } from 'react'
import styles from '../styles.module.scss'
import Image from 'next/image'
import { Product } from '@/components/reusable'
import { Cormorant } from 'next/font/google'

const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })

type Props = {
    data: TProduct
    // list: TProduct[]
}

const ProductDetails: FC<Props> = ({ data }) => {
    console.log("DATA:", data)
    return (
        <div>   
            
        </div>
    )
}

export default memo(ProductDetails)
