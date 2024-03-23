import { CartItem, addRating, uploadImages } from '@/api'
import React, { FC, SetStateAction, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from '../styles.module.scss'
import Image from 'next/image'
import { Button, Divider, Input, Rate, Spin, Upload, message } from 'antd'
import { useAppSelector } from '@/redux/store'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { scaleSize } from '@/constants'
import { motion } from 'framer-motion'
import { messageHelper } from '@/constants/antd'
import { useParams } from 'next/navigation'

type Props = {
	products: CartItem[]
	s: React.Dispatch<SetStateAction<number>>
}

const RateProducts: FC<Props> = ({ products: q, s }) => {
	const { id: group_id } = useParams()
	const [openContainers, setOpenContainers] = useState([])
	const [reviews, setReviews] = useState([])
	const { userData } = useAppSelector(s => s.userData)
	const [uploading, setUploading] = useState(false)
	const reviewLength = reviews?.filter(r => r).map(w => w?.rating).length < q?.length

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			{uploading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	)

	const openContainer = index => {
		setOpenContainers(prevOpenContainers => {
			if (!prevOpenContainers.includes(index)) {
				return [...prevOpenContainers, index]
			}
			return prevOpenContainers
		})
	}

	const handleInputChange = (index, event) => {
		const { name, value } = event.target
		const newReviews = [...reviews]
		newReviews[index] = { ...newReviews[index], [name]: value, product_id: q[index]?.product_id }
		setReviews(newReviews)
	}

	const handleRateChange = (index, value) => {
		const newReviews = [...reviews]
		newReviews[index] = { ...newReviews[index], rating: value, product_id: q[index]?.product_id }
		setReviews(newReviews)
	}

	const handleFileUpload = async (index, file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
		const isLt10M = file.size / 1024 / 1024 < 10

		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!')
			return
		}

		if (!isLt10M) {
			message.error('Image must be smaller than 10MB!')
			return
		}

		setUploading(true)
		try {
			const res = await uploadImages(file)

			setReviews(prevReviews => {
				const newReviews = [...prevReviews]
				const updatedImages = [...(newReviews[index]?.images || []), res.data.url]
				newReviews[index] = { ...newReviews[index], images: updatedImages, product_id: q[index]?.product_id }
				return newReviews
			})
			return ''
		} finally {
			setUploading(false)
		}
	}

	const handleRemoveImage = (index, imageUrl) => {
		setReviews(prevReviews => {
			const newReviews = [...prevReviews]
			const updatedImages = newReviews[index]?.images.filter(image => image !== imageUrl)
			newReviews[index] = { ...newReviews[index], images: updatedImages }
			return newReviews
		})
	}

	const submitReview = async () => {
		if (reviewLength) {
			message.error('review everything first')
			return
		}

		const res = await addRating({ ratings: reviews, user_id: userData?.id, group_id })
		messageHelper(res)
		setReviews([])
	}

	return (
		<div>
			<div className={styles.backContainer}>
				<IoMdArrowRoundBack onClick={() => s(1)} />
				<span>Back</span>
			</div>
			<div className={styles.productWrapper}>
				{q?.map((w, i) => (
					<div className={styles.productContainer} key={i}>
						<Image src={w?.image} alt="product_img" height={40} width={40} />
						<div className={styles.productDetails}>
							<span className={styles.productT}>{w?.product_name}</span>
							<div className={styles.rateContainer}>
								<div className={styles.rateWrapper}>
									<span className={styles.rateH}>Product Quality:</span>

									<div onClick={() => openContainer(i)}>
										<Rate allowClear={false} allowHalf defaultValue={0} onChange={value => handleRateChange(i, value)} />
									</div>
								</div>
								{openContainers.includes(i) && (
									<>
										<div className={styles.inputContainer}>
											<Input name="title" placeholder="Review Title" onChange={e => handleInputChange(i, e)} />
											<Input.TextArea name="description" rows={3} placeholder="Review Description" onChange={e => handleInputChange(i, e)} />
										</div>
										{uploading ? (
											<Spin />
										) : (
											<Upload
												listType="picture-card"
												accept="image/*"
												maxCount={5}
												multiple
												fileList={(reviews[i]?.images || []).map((image, index) => ({
													uid: `${index}-${image}`,
													name: image,
													status: 'done',
													url: image
												}))}
												onRemove={file => handleRemoveImage(i, file.url)}
												action={async e => handleFileUpload(i, e)}
											>
												{uploadButton}
											</Upload>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.btnContainer}>
				<motion.span whileTap={scaleSize} onClick={() => s(1)}>
					Cancel
				</motion.span>
				<motion.span whileTap={scaleSize} className={`!${reviewLength ? 'bg-gray-400' : ''}`} onClick={submitReview}>
					Submit
				</motion.span>
			</div>
		</div>
	)
}

export default RateProducts
