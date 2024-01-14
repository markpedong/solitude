'use client'

import { Flex, Space } from 'antd'
import Link from 'next/link'
import { FC } from 'react'
import styles from './styles.module.scss'
import { jost } from '@/app/page'
import classNames from 'classnames'

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
                <span>
                    <Link href="/">FACEBOOK</Link>
                </span>
                <span>
                    <Link href="/">INSTAGRAM</Link>
                </span>
                <span>
                    <Link href="/">SNAPCHAT</Link>
                </span>
            </Flex>
        </div>
    )
}

export default Footer
