import classNames from 'classnames'
import React, { FC } from 'react'
import styles from './styles.module.scss'
// import { ModalForm, ProForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-components'
// import { MODAL_FORM_PROPS } from '@/constants'
import { Jost } from 'next/font/google'
import { ModalForm, ProForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { MODAL_FORM_PROPS } from '@/constants'
import { Popconfirm } from 'antd'

const jost = Jost({ weight: '400', subsets: ['latin'] })

const Address: FC = () => {
	const renderEditAddress = () => {
		return (
			<ModalForm {...MODAL_FORM_PROPS} width={600} grid title={<span>Edit Address</span>} trigger={<span className={styles.addressTrigger}>Edit</span>}>
				<ProForm.Group>
					<ProFormText label="Full Name" name="name" placeholder="Full Name" colProps={{ span: 12 }} />
					<ProFormText label="Phone Number" name="number" placeholder="Phone Number" colProps={{ span: 12 }} />
				</ProForm.Group>
				<ProFormSelect label="Region, Province, City, Barangay" name="address1" placeholder="Region, Province, City, Barangay" />
				<ProFormText label="Postal Code" name="postal" placeholder="Postal Code" />
				<ProFormText label="Street Name, Building, House No." name="address2" placeholder="Street Name, Building, House No." />
				<ProFormCheckbox.Group name="label_as" layout="horizontal" label="Label As:" options={['Home', 'Work']} />
				<ProFormCheckbox.Group name="check_address" options={['Set as Default Address', 'Set as Pickup Address', 'Set as Return Address']} />
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

	return (
		<div>
			{/* {new Array(5).fill('').map(() => (
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
			))} */}
		</div>
	)
}

export default Address
