import { USER_TYPES } from '@/constants'
import { INPUT_NOSPACE, REQUIRED } from '@/constants/helper'
import { useAppSelector } from '@/redux/store'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { ProForm, ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-components'
import type { GetProp, UploadProps } from 'antd'
import { Flex, Upload, message } from 'antd'
import Image from 'next/image'
import { useState } from 'react'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const ModalProfile = () => {
    const { type } = useAppSelector(state => state.userData)
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>()

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result as string))
        reader.readAsDataURL(img)
    }

    const handleChange: UploadProps['onChange'] = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, url => {
                setLoading(false)
                setImageUrl(url)
            })
        }
    }

    return (
        <>
            <Flex gap={20} align="center" style={{ margin: '0 auto' }}>
                <Upload
                    listType="picture-circle"
                    name="avatar"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}>
                    {imageUrl ? <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <ProForm.Group>
                    {type === USER_TYPES.USER ? (
                        <>
                            <ProFormText
                                label="First Name"
                                name="first_name"
                                placeholder="eg: John"
                                rules={[...INPUT_NOSPACE]}
                            />
                            <ProFormText
                                label="Last Name"
                                name="last_name"
                                placeholder="eg: Smith"
                                rules={[...INPUT_NOSPACE]}
                            />
                        </>
                    ) : (
                        <>
                            <ProFormText
                                name="seller_name"
                                placeholder="YOUR STORE NAME"
                                label="Store Name"
                                fieldProps={{ maxLength: 10 }}
                                rules={[...REQUIRED]}
                            />
                            <ProFormText
                                name="location"
                                placeholder="eg: Cavite, Laguna"
                                label="Store Location"
                                fieldProps={{ maxLength: 10 }}
                                rules={[...REQUIRED]}
                            />
                        </>
                    )}
                </ProForm.Group>
            </Flex>

            <ProForm.Group>
                <ProFormText label="Email Address" name="email" placeholder="your@email.com" colProps={{ span: 12 }} />
                <ProFormText label="Username" name="username" placeholder="Your Username" colProps={{ span: 12 }} />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText.Password
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    colProps={{ span: 12 }}
                    rules={[...INPUT_NOSPACE, { min: 6 }]}
                />

                <ProFormText.Password
                    label="Confirm Password"
                    name="confirm_password"
                    placeholder="Enter Password"
                    colProps={{ span: 12 }}
                    dependencies={['password']}
                    rules={[
                        ...INPUT_NOSPACE,
                        { min: 6 },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error('The passwords do not match'))
                            },
                        }),
                    ]}
                />
            </ProForm.Group>
            {type === USER_TYPES.USER && (
                <ProForm.Group>
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
                                value: 'undefined',
                            },
                        ]}
                        colProps={{ span: 12 }}
                    />
                    <ProFormDatePicker
                        label="Birthday"
                        name="birthday"
                        placeholder="MONTH"
                        width="xl"
                        colProps={{ span: 12 }}
                    />
                </ProForm.Group>
            )}
        </>
    )
}

export default ModalProfile