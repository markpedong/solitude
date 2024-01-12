'use client'

import { jost } from '@/app/page'
import { ProForm, ProFormCheckbox, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Checkbox, Col, Flex, Row, Space } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import styles from './styles.module.scss'

const Profile: FC = () => {
    return (
        <Row className={styles.profileWrapper}>
            <Col span={12}>
                <span className={classNames(jost.className, styles.profileHeader)}>Your Information</span>
                <ProForm
                    grid
                    autoFocusFirstInput={false}
                    submitter={{
                        resetButtonProps: false,
                    }}
                    onFinish={async params => {
                        console.log(params)
                    }}>
                    <ProFormText label="Username" name="username" placeholder="Your Username" colProps={{ span: 12 }} />
                    <ProFormText.Password
                        label="Password"
                        name="password"
                        placeholder="Enter Password"
                        colProps={{ span: 12 }}
                    />
                    <ProFormText
                        label="Email Address"
                        name="email"
                        placeholder="your@email.com"
                        colProps={{ span: 12 }}
                    />
                    <ProFormText.Password
                        label="Confirm Password"
                        name="confirm_password"
                        placeholder="Enter Password"
                        colProps={{ span: 12 }}
                    />
                    <ProFormRadio.Group
                        label="Gender"
                        name="gender"
                        options={[
                            {
                                label: 'Male',
                                value: 'male',
                            },
                            {
                                label: 'Female',
                                value: 'female',
                            },
                            {
                                label: `I'd rather not say`,
                                value: 'n/a',
                            },
                        ]}
                    />
                    <ProFormText label="Birthday">
                        <Space direction="horizontal">
                            <ProFormSelect name="month" colProps={{ span: 4 }} placeholder="MONTH" />
                            <ProFormSelect name="day" colProps={{ span: 4 }} placeholder="DAY" />
                            <ProFormSelect name="year" colProps={{ span: 4 }} placeholder="YEAR" />
                        </Space>
                    </ProFormText>
                </ProForm>
            </Col>
            <Col span={1} />
            <Col span={11}>
                <Flex className={jost.className} justify="center" align="start" vertical gap={20}>
                    <span className={styles.extraContentHeader}>Solitude Emails</span>
                    <span className={styles.extraDescription}>
                        By joining our email list, you will be the first to know about exciting new designs, special
                        events, store openings and much more.
                    </span>
                    <Checkbox className={styles.extraFooter}>Check the box to subscribe to our newsletter</Checkbox>
                </Flex>
            </Col>
        </Row>
    )
}

export default Profile
