'use client'

import { TProduct } from '@/api'
import { PageHeader, Product } from '@/components/reusable'
import { PRODUCT_FILTER } from '@/constants'
import { Button, Col, Flex, Row, Select } from 'antd'
import classNames from 'classnames'
import { FC, memo, useState } from 'react'
import styles from '../styles.module.scss'
import { Jost } from 'next/font/google'

const jost = Jost({ weight: '400', subsets: ['latin'] })

type SearchProps = {
    material?: string
    gender?: string
}

const Products: FC<{ data: TProduct[] }> = ({ data }) => {
    const [products, _1] = useState<TProduct[]>(data)
    const [_, setFilter] = useState<SearchProps>()
    // const handleSearch = e => {
    //     const value = e.target.value.toLowerCase()

    //     setProducts(data.filter(product => product.product_name.toLowerCase().includes(value)))
    // }

    return (
        <div className={styles.mainWrapper}>
            <Row justify="center">
                <Col md={2}></Col>
                <Col span={24} md={20} className={styles.productWrapper}>
                    <PageHeader title="PRODUCTS" />
                    <Flex className={styles.filterWrapper} justify="center" align="center">
                        <Flex className={styles.filterContainer} justify="space-between">
                            {PRODUCT_FILTER?.map(q => {
                                const options = Object.entries(q.options ?? {})?.map(([label, value]) => ({
                                    label,
                                    value,
                                }))

                                return (
                                    <Select
                                        key={q.value}
                                        className={classNames(jost.className, styles.selectContainer)}
                                        onChange={e => {
                                            if (['material', 'gender', 'stock', 'type', 'price'].includes(q.value)) {
                                                setFilter(prevFilter => ({
                                                    ...prevFilter,
                                                    [q.value]: e,
                                                }))
                                            }
                                        }}
                                        defaultValue={q.label}
                                        options={options}
                                        placeholder={q.label.toUpperCase()}
                                        variant="borderless"
                                    />
                                )
                            })}
                        </Flex>
                        <Flex gap={10}>
                            <Button type="primary">SEARCH</Button>
                            <Button onClick={() => setFilter({})}>RESET</Button>
                        </Flex>
                    </Flex>
                    <Flex className={styles.productContainer} wrap="wrap" justify="center">
                        {products?.map(q => (
                            <Product
                                description={q.description}
                                id={q.product_id}
                                image={q.image?.[0]}
                                price={q.price}
                                product_name={q.product_name}
                                key={q.product_id}
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
