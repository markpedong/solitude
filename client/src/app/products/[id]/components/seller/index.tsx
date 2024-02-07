import React, { FC, memo } from 'react'
import styles from './styles.module.scss'
import { Button, Col, Divider, Flex, Row } from 'antd'
import { SellerData } from '@/api'
import Image from 'next/image'
import { ShopOutlined, WechatOutlined } from '@ant-design/icons'

type Props = {
    data: SellerData
}

const Seller: FC<Props> = memo(({ data }) => {
    console.log('SELLER: ', data)
    return (
        <Row justify="center">
            <Col span={20}>
                <div className={styles.sellerContainer}>
                    <div className={styles.sellerDescContainer}>
                        <Image src={data.avatar} width={200} height={200} alt={data.seller_name} />
                        <Flex className={styles.sellerDesc} vertical>
                            <span>{data.seller_name}</span>
                            <span>Active 1 Minute Ago</span>
                            <div>
                                {/* <Button icon={<WechatOutlined />}>Chat Now</Button> */}
                                <Button type='primary' icon={<ShopOutlined />}>View Shop</Button>
                            </div>
                        </Flex>
                    </div>
                    <div>
                        1 <Divider type="vertical" />
                    </div>
                    <div>
                        1 <Divider type="vertical" />
                    </div>
                </div>
            </Col>
        </Row>
    )
})

export default Seller
