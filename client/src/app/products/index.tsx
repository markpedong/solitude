'use client'

import { TProduct } from '@/api'
import { jost } from '@/app/page'
import { PageHeader, Product } from '@/components/reusable'
import { PRODUCT_FILTER } from '@/constants'
import { SearchOutlined } from '@ant-design/icons'
import { Col, Flex, Input, Row, Select } from 'antd'
import classNames from 'classnames'
import { FC, memo, useState } from 'react'
import styles from './styles.module.scss'

const Products: FC<{ data: TProduct[] }> = ({ data }) => {
    const [products, setProducts] = useState<TProduct[]>(data)
    const [filter, setFiler] = useState({})
    const handleSearch = e => {
        const value = e.target.value.toLowerCase()

        setProducts(data.filter(product => product.product_name.toLowerCase().includes(value)))
    }
    return (
        <div>
            <Row justify="center">
                <Col md={2}></Col>
                <Col span={24} md={20} className={styles.productWrapper}>
                    <PageHeader title="PRODUCTS" />
                    <Flex className={styles.filterWrapper} justify="space-between" align="center">
                        <Flex className={styles.filterContainer} justify="space-between">
                            {PRODUCT_FILTER.map(q => {
                                const options = Object.entries(q.options ?? {}).map(([label, value]) => ({
                                    label,
                                    value,
                                }))

                                return (
                                    <Select
                                        key={q.value}
                                        className={classNames(jost.className, styles.selectContainer)}
                                        onChange={e => console.log(e, q.value)}
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
