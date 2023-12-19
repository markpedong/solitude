'use client'

import { Card, Col, Flex, Row, Space } from 'antd'
import { FC } from 'react'
import styles from './styles.module.scss'

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
                    <Space>
                        <Flex className={styles.blogItem} vertical>
                            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            <Flex className={styles.featuresTextContainer} justify="center" vertical={true} gap={10}>
                                <span>COLLECTION #1</span>
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo, odio vitae
                                    turpis egestas fermentum. Sagittis cras morbi orci metus, praesent tortor congue
                                    aliquam. Lacus ac sed ac semper. Donec eu imperdiet hendrerit ultrices at amet
                                    purus.
                                </span>
                                <span>Read More</span>
                            </Flex>
                        </Flex>
                        <Flex className={styles.blogItem} vertical>
                            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            <Flex className={styles.featuresTextContainer} justify="center" vertical={true} gap={10}>
                                <span>COLLECTION #1</span>
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo, odio vitae
                                    turpis egestas fermentum. Sagittis cras morbi orci metus, praesent tortor congue
                                    aliquam. Lacus ac sed ac semper. Donec eu imperdiet hendrerit ultrices at amet
                                    purus.
                                </span>
                                <span>Read More</span>
                            </Flex>
                        </Flex>
                        <Flex className={styles.blogItem} vertical>
                            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            <Flex className={styles.featuresTextContainer} justify="center" vertical={true} gap={10}>
                                <span>COLLECTION #1</span>
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo, odio vitae
                                    turpis egestas fermentum. Sagittis cras morbi orci metus, praesent tortor congue
                                    aliquam. Lacus ac sed ac semper. Donec eu imperdiet hendrerit ultrices at amet
                                    purus.
                                </span>
                                <span>Read More</span>
                            </Flex>
                        </Flex>
                    </Space>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default Blog
