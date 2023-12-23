'use client'

import { Card, Col, Flex, Row, Space } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'
import { blogData } from '@/constants/testdata'
import Link from 'next/link'

const { Meta } = Card

const Blog: FC = () => {
    return (
        <div className={styles.blogContainer}>
            <Flex className={styles.titleContainer} justify="center" align="center" vertical>
                <span>Our Blog</span>
                <span>More Articles</span>
            </Flex>
            <Row justify="center">
                <Col></Col>
                <Col>
                    <Space className={styles.blogItemsContainer} align="center">
                        {blogData.map(q => (
                            <Flex className={styles.blogItem} vertical key={q.image}>
                                <img alt="example" src={q.image} />
                                <Flex
                                    className={styles.featuresTextContainer}
                                    justify="center"
                                    vertical={true}
                                    gap={10}>
                                    <span>{q.title}</span>
                                    <span>{q.description}</span>
                                    <Link href={q.blog_link}>Read More</Link>
                                </Flex>
                            </Flex>
                        ))}
                    </Space>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default Blog
