'use client'

import { Col, Row } from 'antd'
import { FC } from 'react'
type Props = {}

const Orders: FC<Props> = () => {
    return (
        <Row>
            <Col span={24}>
                {/* {new Array(5).fill('').map(() => (
                    <Flex className={styles.orderContainer}>
                        <Image
                            src="https://random.imagecdn.app/150/150?random=965622"
                            alt="order"
                            width={1000}
                            height={1000}
                        />
                        <Flex className={styles.orderDescription} justify="center" align="start" vertical>
                            <span>Cat Litter Box With Scoop Kitten Litter Box Cat Toilet</span>
                            <span>Variation: Green, L: {`[48X40X14CM]`}</span>
                            <span>x1</span>
                        </Flex>
                        <div className={styles.orderPrice}>
                            <span>₱459</span>
                            <span>₱156</span>
                        </div>
                    </Flex>
                ))} */}
            </Col>
        </Row>
    )
}

export default Orders
