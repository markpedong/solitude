'use client'

import { USER_TYPES } from '@/constants'
import { INPUT_LETTERS, INPUT_NUMBER, INPUT_TRIM, REQUIRED, afterModalformFinish } from '@/constants/helper'
import { useAppSelector } from '@/redux/store'
import { ActionType, ModalForm, ProForm, ProFormDatePicker, ProFormInstance, ProFormRadio, ProFormText } from '@ant-design/pro-components'
import { Button, Flex, Upload, message } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Jost } from 'next/font/google'
import { FC, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'
import { getSellerData, getUserData, updateSellerData, updateUserData, uploadImages } from '@/api'
import { setSellerData, setUserData } from '@/redux/features/userSlice'
import type { GetProp, UploadProps } from 'antd'
import { LoadingOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons'
import Image from 'next/image'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const jost = Jost({ weight: '400', subsets: ['latin'] })

const Profile: FC = () => {
	const { userData, sellerData, type } = useAppSelector(state => state.userData)
	const [imageUrl, setImageUrl] = useState<string>()
	const actionRef = useRef<ActionType>()
	const formRef = useRef<ProFormInstance>()
	const dispatch = useDispatch()

	const handleFinish = async params => {
		let res

		if (type === USER_TYPES.USER) {
			res = await updateUserData({ ...params, avatar: imageUrl, id: userData?.id })
		} else {
			res = await updateSellerData({ ...params, avatar: imageUrl, seller_id: sellerData?.seller_id })
		}

		if (res?.success && type === USER_TYPES.USER) {
			const user = await getUserData({ id: userData?.id })
			await dispatch(setUserData(user?.data))
		}

		if (res?.success && type === USER_TYPES.SELLER) {
			const user = await getSellerData({ seller_id: sellerData?.seller_id })
			await dispatch(setSellerData(user?.data))
		}

		setTimeout(() => {
			window.location.reload()
		}, 1000)
		return afterModalformFinish(actionRef, res.message, res.success, formRef)
	}
	const [loading, setUploading] = useState(false)

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

	return (
		<ModalForm
			grid
			formRef={formRef}
			autoFocusFirstInput={false}
			initialValues={
				type === USER_TYPES.USER
					? {
							...userData,
							password: '',
							birthday: !!userData?.birthday ? userData?.birthday : dayjs().format('MM-DD-YYYY')
					  }
					: { ...sellerData }
			}
			trigger={<a className={classNames(styles.linkItem, jost.className)}>ACCOUNT</a>}
			title={<span className={styles.profileTitle}>Your Information</span>}
			submitter={{
				resetButtonProps: false,
				render: () => [
					<Button type="primary" onClick={() => formRef?.current.submit()}>
						Submit
					</Button>
				]
			}}
			onOpenChange={async visible => {
				if (visible) {
					let data
					if (type === USER_TYPES.SELLER) {
						data = await getSellerData({ seller_id: sellerData?.seller_id })
						await dispatch(setSellerData(data?.data))
					} else {
						data = await getUserData({ id: userData?.id })
						await dispatch(setUserData(data?.data))
					}

					setImageUrl(data?.data?.avatar)
				}
			}}
			onFinish={handleFinish}
		>
			<Flex gap={20} align="center" style={{ margin: '0 auto' }}>
				<Upload
					listType="picture-circle"
					name="avatar"
					showUploadList={false}
					beforeUpload={beforeUpload}
					action={async e => {
						setUploading(true)
						setImageUrl('')

						try {
							const res = await uploadImages(e)
							setImageUrl(res?.data?.url)

							return res?.data?.url
						} finally {
							setUploading(false)
						}
					}}
				>
					{imageUrl ? <Image priority className={styles.profileImage} src={imageUrl} alt="avatar" width={100} height={100} /> : uploadButton}
				</Upload>
				<ProForm.Group>
					{type === USER_TYPES.USER ? (
						<>
							<ProFormText {...INPUT_LETTERS} label="First Name" name="first_name" placeholder="eg: John" rules={[...REQUIRED]} colProps={{ span: 21 }} />
							<ProFormText {...INPUT_LETTERS} label="Last Name" name="last_name" placeholder="eg: Smith" rules={[...REQUIRED]} colProps={{ span: 21 }} />
						</>
					) : (
						<>
							<ProFormText
								name="seller_name"
								placeholder="YOUR STORE NAME"
								label="Store Name"
								fieldProps={{ maxLength: 30 }}
								colProps={{ span: 21 }}
								rules={[...REQUIRED]}
							/>
							<ProFormText
								name="location"
								placeholder="eg: Cavite, Laguna"
								label="Store Location"
								fieldProps={{ maxLength: 30 }}
								colProps={{ span: 21 }}
								rules={[...REQUIRED]}
							/>
						</>
					)}
					<ProFormText
						{...INPUT_NUMBER}
						label="Phone Number"
						rules={[...REQUIRED]}
						name="phone"
						colProps={{ span: 21 }}
						fieldProps={{
							maxLength: 12
						}}
					/>
				</ProForm.Group>
			</Flex>

			<ProForm.Group>
				<ProFormText {...INPUT_TRIM} label="Email Address" name="email" placeholder="your@email.com" colProps={{ span: 12 }} rules={[...REQUIRED]} />
				<ProFormText {...INPUT_TRIM} label="Username" name="username" placeholder="Your Username" colProps={{ span: 12 }} />
			</ProForm.Group>
			<ProForm.Group>
				<ProFormText.Password
					{...INPUT_TRIM}
					name="password"
					placeholder="Enter Password"
					label="Password"
					fieldProps={{ prefix: <LockOutlined /> }}
					colProps={{ span: 12 }}
					rules={[...REQUIRED, { min: 6 }]}
				/>
				<ProFormText.Password
					{...INPUT_TRIM}
					name="confirm_password"
					placeholder="Re-enter Password"
					label="Confirm Password"
					colProps={{ span: 12 }}
					dependencies={['password']}
					rules={[
						...REQUIRED,
						{ min: 6 },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve()
								}
								return Promise.reject(new Error('The passwords do not match'))
							}
						})
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
								value: 'male'
							},
							{
								label: 'Female',
								value: 'female'
							},
							{
								label: `I'd rather not say`,
								value: 'undefined'
							}
						]}
						colProps={{ span: 12 }}
					/>
					<ProFormDatePicker label="Birthday" name="birthday" placeholder="MONTH" width="xl" colProps={{ span: 12 }} fieldProps={{ variant: 'outlined' }} />
				</ProForm.Group>
			)}
		</ModalForm>
	)
}

export default Profile
