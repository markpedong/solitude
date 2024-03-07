import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { ActionType, ModalForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { ADDRESS_TYPE, MODAL_FORM_PROPS, scaleSize, scaleSizeSm } from '@/constants'
import { Popconfirm } from 'antd'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/redux/store'
import { REQUIRED, afterModalformFinish } from '@/constants/helper'
import { InfoItem, addDeliveryInfo, getDeliveryInfo } from '@/api'

const Address: FC = () => {
	const { userData } = useAppSelector(s => s.userData)
	const formRef = useRef<ProFormInstance>()
	const actionRef = useRef<ActionType>()
	const [info, setInfo] = useState<InfoItem[]>([])

	const renderEditInfo = (q: InfoItem) => {
		return (
			<ModalForm
				{...MODAL_FORM_PROPS}
				width={600}
				grid
				title={<span>Edit Address</span>}
				trigger={<span className={styles.addressTrigger}>Edit</span>}
				submitter={{
					render: props => (
						<div className={styles.footerBtn}>
							<motion.span whileTap={scaleSize} className={styles.cancelBtn} onClick={() => props?.reset()}>
								Reset
							</motion.span>
							<motion.span whileTap={scaleSize} className={styles.submitBtn} onClick={() => props?.submit()}>
								Submit
							</motion.span>
						</div>
					)
				}}
			>
				<ProFormText colProps={{ span: 12 }} label="First Name" name="first_name" required placeholder="eg: John" />
				<ProFormText colProps={{ span: 12 }} label="Last Name" name="last_name" required placeholder="eg: Smith" />
				<ProFormText colProps={{ span: 12 }} label="Phone Number" name="phone_number" required placeholder="eg: +639798161248" />
				<ProFormText colProps={{ span: 12 }} label="House" name="house" required placeholder="eg: Blk 65 Lot 20" />
				<ProFormText colProps={{ span: 12 }} label="Street" name="street" required placeholder="eg: Harbor Drive" />
				<ProFormText colProps={{ span: 12 }} label="City" name="city" required placeholder="eg: Manila" />
				<ProFormText colProps={{ span: 12 }} label="Pin Code" name="pin_code" required placeholder="eg: 4684" />
				<ProFormSelect
					colProps={{ span: 12 }}
					label="Address Type"
					required
					placeholder="eg: Default Address"
					options={[
						{ label: 'Default Address', value: 1 },
						{ label: 'Pickup Address', value: 2 },
						{ label: 'Return Address', value: 3 }
					]}
				/>
			</ModalForm>
		)
	}

	const renderSetDefault = (q: InfoItem) => {
		return (
			<Popconfirm title="Default" description="Are you sure to set this as a default address?" onConfirm={() => console.log('default')} okText="Yes" cancelText="No">
				<span className={styles.addressTrigger}>Set as Default</span>
			</Popconfirm>
		)
	}

	const renderDeleteInfo = (q: InfoItem) => {
		return (
			<Popconfirm title="Delete" description="Are you sure to delete this address?" onConfirm={() => console.log('deleted')} okText="Yes" cancelText="No">
				<span className={styles.addressTrigger}>Delete</span>
			</Popconfirm>
		)
	}

	const handleAddInfo = async params => {
		const res = await addDeliveryInfo({ ...params, user_id: userData?.id })

		return afterModalformFinish(actionRef, res?.message, res?.success, formRef)
	}

	const renderAddInfo = () => {
		return (
			<ModalForm
				title={<span className={styles.addModalTitle}>add address</span>}
				trigger={
					<motion.span className={styles.addBtn} whileTap={scaleSize}>
						New Address
					</motion.span>
				}
				grid
				submitter={{
					render: props => (
						<div className={styles.footerBtn}>
							<motion.span whileTap={scaleSize} className={styles.cancelBtn} onClick={() => props?.reset()}>
								Reset
							</motion.span>
							<motion.span whileTap={scaleSize} className={styles.submitBtn} onClick={() => props?.submit()}>
								Submit
							</motion.span>
						</div>
					)
				}}
				onFinish={handleAddInfo}
			>
				<ProFormText colProps={{ span: 12 }} label="First Name" name="first_name" rules={[...REQUIRED]} placeholder="eg: John" />
				<ProFormText colProps={{ span: 12 }} label="Last Name" name="last_name" rules={[...REQUIRED]} placeholder="eg: Smith" />
				<ProFormText colProps={{ span: 12 }} label="Phone Number" name="phone" rules={[...REQUIRED]} placeholder="eg: +639798161248" />
				<ProFormText colProps={{ span: 12 }} label="House" name="house" rules={[...REQUIRED]} placeholder="eg: Blk 65 Lot 20" />
				<ProFormText colProps={{ span: 12 }} label="Street" name="street" rules={[...REQUIRED]} placeholder="eg: Harbor Drive" />
				<ProFormText colProps={{ span: 12 }} label="City" name="city" rules={[...REQUIRED]} placeholder="eg: Manila" />
				<ProFormText colProps={{ span: 12 }} label="Pin Code" name="pin_code" rules={[...REQUIRED]} placeholder="eg: 4684" />
				<ProFormSelect colProps={{ span: 12 }} label="Address Type" name="address_type" rules={[...REQUIRED]} placeholder="eg: Default Address" options={ADDRESS_TYPE} />
			</ModalForm>
		)
	}

	const fetchInfo = async () => {
		const res = await getDeliveryInfo({ user_id: userData?.id })

		setInfo(res?.data)
	}
	useEffect(() => {
		fetchInfo()
	}, [])
	return (
		<div>
			{renderAddInfo()}
			{info.map(q => (
				<div className={styles.addressContainer} key={q?.id}>
					<div className={styles.detailsContainer}>
						<div>
							<span>{q?.first_name}</span> | <span>+{q?.phone}</span>
						</div>
						<div>
							{q?.house}, {q?.street}
						</div>
						<div>
							{q?.city}, {q?.pin_code}
						</div>
						<div>
							<span className={q.address_type === 1 && styles.activeAddress}>Default</span>
							<span className={q.address_type === 2 && styles.activeAddress}>Pickup Address</span>
							<span className={q.address_type === 3 && styles.activeAddress}>Return Address</span>
						</div>
					</div>
					<div className={styles.addressOperators}>
						{renderEditInfo(q)}
						{renderDeleteInfo(q)}
						{renderSetDefault(q)}
					</div>
				</div>
			))}
		</div>
	)
}

export default Address
