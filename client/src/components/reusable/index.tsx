'use client'

import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Flex } from 'antd'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { Cormorant, Jost } from 'next/font/google'

const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })
const jost = Jost({ weight: '400', subsets: ['latin'] })

type CProps = {
    image: string
    title: string
    description: string
    className?: string
}

type PProps = {
    id
    image
    product_name
    description
    price
    className?: string
}

const style = { color: 'black', textDecoration: 'none' }

const Product: FC<PProps> = ({ id, image, product_name, description, price, className }) => {
    return (
        <Link href={`/products/${id}`} style={style} key={id}>
            <div className={className ?? styles.itemContainer} key={id}>
                <Image src={image} alt={product_name} width={1000} height={1000} priority />
                <span className={`${styles.cardTitle} ${jost.className}`}>{product_name}</span>
                <span className={styles.cardDescription}>{description}</span>
                <span className={styles.cardFooter}>$ {price.toFixed(2)}</span>
            </div>
        </Link>
    )
}

const Collection: FC<CProps> = ({ image, description, title, className }) => {
    return (
        <div className={classNames(className, styles.featuresItem)} key={image}>
            <Flex className={styles.image} justify="center">
                <img src={image} alt="features" />
            </Flex>
            <Flex className={`${styles.featuresTextContainer} ${jost.className}`} justify="center" vertical={true}>
                <span>{title}</span>
                <span>{description}</span>
            </Flex>
        </div>
    )
}

const PageHeader: FC<{ title: string }> = ({ title }) => {
    return (
        <Flex className={styles.productHeaderContainer} vertical justify="center" align="center" gap={20}>
            <span>SOLITUDE / {title}</span>
            <h1 className={cormorant.className}>{title}</h1>
        </Flex>
    )
}
export { Collection, PageHeader, Product }
