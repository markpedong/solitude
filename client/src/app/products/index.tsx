'use client'

import { TProduct } from '@/api'
import { cormorant, jost } from '@/app/page'
import Product from '@/components/products'
import { PRODUCT_FILTER } from '@/constants'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import { Col, Flex, Input, Row, Select } from 'antd'
import { FC, memo, useState } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

const Products: FC<{ data: TProduct[] }> = ({ data }) => {
    const [products, setProducts] = useState<TProduct[]>(data)

    const handleSearch = e => {
        const value = e.target.value.toLowerCase()

        setProducts(data.filter(product => product.product_name.toLowerCase().includes(value)))
    }
    return (
        <div>
            <Row justify="center">
                <Col md={2}></Col>
                <Col span={24} md={20} className={styles.productWrapper}>
                    <Flex className={styles.productHeaderContainer} vertical justify="center" align="center" gap={20}>
                        <span>SOLITUDE / PRODUCTS</span>
                        <h1 className={cormorant.className}>PRODUCTS</h1>
                    </Flex>
                    <Flex className={styles.filterWrapper} justify="space-between" align="center">
                        <Flex className={styles.filterContainer} justify="space-between">
                            {PRODUCT_FILTER.map(q => {
                                const options = Object.entries(q.options ?? {}).map(([label, value]) => ({
                                    label,
                                    value,
                                }))

                                return (
                                    <Select
                                        className={classNames(jost.className, styles.selectContainer)}
                                        options={options}
                                        placeholder={q.label.toUpperCase()}
                                        bordered={false}
                                    />
                                )
                            })}
                        </Flex>
                        <div>
                            <Input
                                placeholder="Search"
                                style={{ width: 200 }}
                                suffix={<SearchOutlined />}
                                onChange={handleSearch}
                            />
                        </div>
                    </Flex>
                    ADD FILTER FOR MOBILE
                    <Flex className={styles.productContainer} wrap="wrap" justify="center">
                        {products.map(q => (
                            <Product
                                description={q.description}
                                id={q.id}
                                image={q.image}
                                price={q.price}
                                product_name={q.product_name}
                                key={q.id}
                            />
                        ))}
                    </Flex>
                </Col>
                <Col md={2}></Col>
            </Row>
        </div>
    )
}

export default memo(Products)
