'use client'

import { Flex } from 'antd'
import Link from 'next/link'
import { FC } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Jost } from 'next/font/google'

const jost = Jost({ weight: '400', subsets: ['latin'] })

const MenuItem: FC<{ url: string }> = ({ url }) => (
    <a className={styles.menuItem} href={url}>
        {url}
    </a>
)

const Footer: FC = () => {
    return (
        <div className={styles.footerWrapper}>
            <Flex className={classNames(jost.className, styles.menuContainer)} justify="center" align="center">
                <MenuItem url="products" />
                <MenuItem url="brands" />
                <MenuItem url="deals" />
                <MenuItem url="services" />
            </Flex>
            <Flex className={classNames(jost.className, styles.socialMediaContainer)} justify="center" align="center">
                <motion.span whileTap={{ scale: 0.9 }}>
                    <Link href="/">FACEBOOK</Link>
                </motion.span>
                <motion.span whileTap={{ scale: 0.9 }}>
                    <Link href="/">INSTAGRAM</Link>
                </motion.span>
                <motion.span whileTap={{ scale: 0.9 }}>
                    <Link href="/">SNAPCHAT</Link>
                </motion.span>
            </Flex>
        </div>
    )
}

export default Footer
