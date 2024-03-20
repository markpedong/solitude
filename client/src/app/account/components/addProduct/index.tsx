'use client'

import { TProduct, addProduct, editProduct, uploadImages } from '@/api'
import { INPUT_NOSPACE, REQUIRED, afterModalformFinish } from '@/constants/helper'
import { useAppSelector } from '@/redux/store'
import { ActionType, ProForm, ProFormDigit, ProFormInstance, ProFormList, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components'
import { Button, Col, Flex, Spin, UploadFile } from 'antd'
import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { omit } from 'lodash'
import { scaleSize } from '@/constants'
import { useRouter } from 'next/navigation'

type Props = {
	product?: TProduct
}

const AddProduct: FC<Props> = ({ product }) => {
	const [uploading, setUploading] = useState(false)
	const { sellerData } = useAppSelector(state => state.userData)
	const [uploadedImages, setUploadedImages] = useState(product?.image.map(q => ({ url: q })))
	const formRef = useRef<ProFormInstance>()
	const actionRef = useRef<ActionType>()
	const router = useRouter()

	return (
		<div className={styles.addProductWrapper}>
			<ProForm
				grid
				initialValues={product || {}}
				autoFocusFirstInput={false}
				submitter={false}
				formRef={formRef}
				onFinish={async params => {
					let res

					if (!!product?.product_id) {
						res = await editProduct(
							omit(
								{
									...product,
									...params,
									discount: +params.discount,
									image: uploadedImages?.map(q => q.url)
								},
								['upload', 'checkout_id']
							)
						)
					} else {
						res = await addProduct(
							omit(
								{
									...params,
									seller_id: sellerData.seller_id,
									price: +params.price,
									image: uploadedImages?.map(q => q.url)
								},
								'upload'
							)
						)

						setUploadedImages([])
					}

					router.refresh()
					return afterModalformFinish(actionRef, res?.message, res?.success, formRef)
				}}
			>
				<ProFormText colProps={{ span: 10 }}>
					<Flex className={styles.galleryContainer} justify="center" align="center">
						{uploading ? (
							<Spin />
						) : (
							<ProFormUploadButton
								name="upload"
								title="UPLOAD YOUR IMAGE"
								fieldProps={{
									name: 'files',
									listType: 'picture-card',
									accept: 'image/*',
									multiple: true,
									onRemove: e => {
										setUploadedImages(s => s.filter(q => q?.url !== e?.url))
									},
									fileList: uploadedImages as UploadFile<any>[],
									action: async e => {
										setUploading(true)
										if (!!!product?.image.length) {
											setUploadedImages([])
										}

										try {
											const res = await uploadImages(e)
											setUploadedImages(state => [...state, res.data])

											return ''
										} finally {
											setUploading(false)
										}
									}
								}}
							/>
						)}
					</Flex>
				</ProFormText>
				<ProFormText colProps={{ span: 13 }}>
					<ProFormText label="Name" name="product_name" placeholder="Product Name" colProps={{ span: 24 }} rules={[...REQUIRED]} />
					<ProFormTextArea label="Description" name="description" placeholder="Description" colProps={{ span: 24 }} rules={[...REQUIRED]} />
					<ProForm.Group>
						<ProFormText label="Price" name="price" placeholder="Price" colProps={{ span: 12 }} rules={[...REQUIRED]} />
						<ProFormDigit
							label="Discount"
							name="discount"
							placeholder="Discount"
							colProps={{ span: 12 }}
							fieldProps={{
								formatter: value => `${value}%`
							}}
							rules={[...REQUIRED]}
						/>
						<ProFormDigit label="Amount in Stock" name="stock" placeholder="in Stock" colProps={{ span: 12 }} rules={[...REQUIRED]} />
					</ProForm.Group>
					<ProFormSelect
						label="Category"
						name="categories"
						mode="tags"
						placeholder="eg: clothing, accessories"
						colProps={{ span: 24 }}
						allowClear={false}
						showSearch={false}
						rules={[...REQUIRED, ...INPUT_NOSPACE]}
						getValueFromEvent={(e: string[]) => e?.map(q => q?.replaceAll(/\s/g, ''))}
					/>
					<ProFormList name="variations" label="Add a variant: " copyIconProps={false} required className={styles.prolistContainer}>
						<ProForm.Group key="group">
							<ProFormText name="label" colProps={{ span: 8 }} rules={[...REQUIRED, ...INPUT_NOSPACE]} placeholder="eg: color" />
							<ProFormSelect
								name="value"
								mode="tags"
								placeholder="black, red, blue"
								allowClear={false}
								showSearch={false}
								colProps={{ span: 16 }}
								rules={[...REQUIRED, ...INPUT_NOSPACE]}
								getValueFromEvent={(e: string[]) => e?.map(q => q?.replaceAll(/\s/g, ''))}
							/>
						</ProForm.Group>
					</ProFormList>
					<Flex justify="center" gap={20}>
						<motion.div whileTap={scaleSize}>
							<Button type="primary" onClick={() => formRef?.current.submit()}>
								Submit
							</Button>
						</motion.div>
					</Flex>
				</ProFormText>
			</ProForm>
		</div>
	)
}

export default AddProduct
