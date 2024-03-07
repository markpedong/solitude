import React, { FC } from 'react'
import styles from './styles.module.scss'
import { Jost } from 'next/font/google'
import { ModalForm, ProForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { MODAL_FORM_PROPS, scaleSize, scaleSizeSm } from '@/constants'
import { Popconfirm } from 'antd'
import { motion } from 'framer-motion'

const jost = Jost({ weight: '400', subsets: ['latin'] })

const Address: FC = () => {
	const renderEditAddress = () => {
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

	const renderSetDefault = () => {
		return (
			<Popconfirm title="Default" description="Are you sure to set this as a default address?" onConfirm={() => console.log('default')} okText="Yes" cancelText="No">
				<span className={styles.addressTrigger}>Set as Default</span>
			</Popconfirm>
		)
	}

	const renderDeleteAddress = () => {
		return (
			<Popconfirm title="Delete" description="Are you sure to delete this address?" onConfirm={() => console.log('deleted')} okText="Yes" cancelText="No">
				<span className={styles.addressTrigger}>Delete</span>
			</Popconfirm>
		)
	}

	const renderAddAddress = () => {
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

	return (
		<div>
			{renderAddAddress()}
			{new Array(5).fill('').map(() => (
				<div className={styles.addressContainer}>
					<div className={styles.detailsContainer}>
						<div>
							<span>Mark</span> | <span>(+63) 9760588324</span>
						</div>
						<div>GG, Blk 4 Lot 1 corner Coral Way St, Diosdado Macapagal Blvd, Pasay</div>
						<div>Barangay 78, Pasay City, Metro Manila, Metro Manila, 1709</div>
						<div>
							<span>Default</span>
							<span>Pickup Address</span>
							<span>Return Address</span>
						</div>
					</div>
					<div className={styles.addressOperators}>
						{renderEditAddress()}
						{renderDeleteAddress()}
						{renderSetDefault()}
					</div>
				</div>
			))}
		</div>
	)
}

export default Address
