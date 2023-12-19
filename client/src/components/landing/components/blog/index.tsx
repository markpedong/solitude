'use client'

import { Col, Flex, Row } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'

const Blog: FC = () => {
    return (
        <div className={styles.blogContainer}>
            <Flex className={styles.titleContainer} justify="center" align="center" vertical>
                <span>Our Blog</span>
                <span>More Articles</span>
            </Flex>
            <Row justify="center">
                <Col></Col>
                <Col>1</Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default Blog
