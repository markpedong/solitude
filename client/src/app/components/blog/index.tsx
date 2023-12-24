'use client'

import { Card, Col, Flex, Row, Space } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { TBlog } from '@/api'
import { cormorant, jost } from '@/app/page'

const Blog: FC<{ data: TBlog[] }> = ({ data }) => {
    return (
        <div className={styles.blogContainer}>
            <Flex className={styles.titleContainer} justify="center" align="center" vertical>
                <span className={cormorant.className}>Our Blog</span>
                <span>More Articles</span>
            </Flex>
            <Row justify="center">
                <Col></Col>
                <Col>
                    <Space className={styles.blogItemsContainer} align="center">
                        {data.map(q => (
                            <Flex className={styles.blogItem} vertical key={q.image}>
                                <img alt="example" src={q.image} />
                                <Flex
                                    className={styles.featuresTextContainer}
                                    justify="center"
                                    vertical={true}
                                    gap={10}>
                                    <span>{q.title}</span>
                                    <span>{q.description}</span>
                                    <Link href={q.blog_link} target="_blank">
                                        Read More
                                    </Link>
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
