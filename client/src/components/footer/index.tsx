'use client'

import { setNavigationMenu } from '@/redux/features/navigationSlice'
import { useAppSelector } from '@/redux/store'
import { Flex, Menu, Space } from 'antd'
import { MenuProps } from 'antd/lib'
import { FC, useEffect } from 'react'
import styles from './styles.module.scss'

const items: MenuProps['items'] = [
    {
        label: 'OUR CARE GUIDE',
        key: 'guide',
    },
    {
        label: 'ABOUT US',
        key: 'about',
    },
    {
        label: 'SOLITUDE',
        key: 'solitude',
    },
    {
        label: 'SERVICES',
        key: 'services',
    },
]

const Footer: FC = () => {
    const selected = useAppSelector(state => state.navigation.selected)

    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e)
        setNavigationMenu(e.key)
    }

    useEffect(() => {}, [selected])

    return (
        <div className={styles.footerWrapper}>
            <Flex justify="center" align="center" vertical gap={5}>
                <Menu onClick={onClick} selectedKeys={[selected]} mode="horizontal" items={items} disabledOverflow />
                <Space size={30} className={styles.socialMediaContainer}>
                    <span>FACEBOOK</span>
                    <span>INSTAGRAM</span>
                    <span>SNAPCHAT</span>
                </Space>
            </Flex>
        </div>
    )
}

export default Footer
