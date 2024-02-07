import React, { FC, memo } from 'react'
import styles from './styles.module.scss'
import { Button, Col, Divider, Flex, Row } from 'antd'
import { SellerData } from '@/api'
import Image from 'next/image'
import { ShopOutlined, WechatOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/relativeTime'

dayjs.extend(isLeapYear)

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
                            <span className={styles.title}>{data.seller_name}</span>
                            {/* <span>Active 1 Minute Ago</span> */}
                            <div>
                                {/* <Button icon={<WechatOutlined />}>Chat Now</Button> */}
                                <Button type='primary' icon={<ShopOutlined />}>View Shop</Button>
                            </div>
                        </Flex>
                    </div>
                    <div className={styles.extraContainer}>
                        <span>Joined <p>{dayjs(data.created_at).fromNow()}</p></span>
                        <span>Products <p>{data.products}</p></span>
                    </div>
                    {/* <div>
                        1 <Divider type="vertical" />
                    </div> */}
                </div>
            </Col>
        </Row>
    )
})

export default Seller
