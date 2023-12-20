import { Flex } from 'antd'
import React, { FC } from 'react'
import styles from './style.module.scss'

type Props = {
    image: string
    title: string
    description: string
}

const Collection: FC<Props> = ({ description, image, title }) => {
    return (
        <div className={styles.featuresItem}>
            <Flex className={styles.image} justify="center">
                <img src={image} alt="features" />
            </Flex>
            <Flex className={styles.featuresTextContainer} justify="center" vertical={true}>
                <span>{description}</span>
                <span>{title}</span>
            </Flex>
        </div>
    )
}

export default Collection
