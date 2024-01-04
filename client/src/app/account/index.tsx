'use client'

import { Col, Row } from 'antd'
import React, { FC } from 'react'

type Props = {}

const Account: FC<Props> = () => {
    return (
        <Row>
            <Col xs={0} lg={4} />
            <Col lg={16}></Col>
            <Col xs={0} lg={4} />
        </Row>
    )
}

export default Account
