'use client'

import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Flex } from 'antd'
import { jost } from '@/app/page'
import classNames from 'classnames'

type Props = {
    image: string
    title: string
    description: string
    className?: string
}

const Collection: FC<Props> = ({ image, description, title, className }) => {
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

export default Collection
