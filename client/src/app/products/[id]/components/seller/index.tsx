import React, { FC, memo } from 'react'
import styles from './styles.module.scss'
import { Col, Divider, Row } from 'antd'

type Props = {}

const Seller: FC<Props> = memo(() => {
    return (
        <Row justify="center">
            <Col span={20}>
                <div className={styles.sellerContainer}>
                    <div>1 <Divider type='vertical'/></div>
                    <div>1 <Divider type='vertical'/></div>
                    <div>1 <Divider type='vertical'/></div>
                </div>
            </Col>
        </Row>
    )
})

export default Seller
