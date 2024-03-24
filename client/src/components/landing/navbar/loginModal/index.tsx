import { USER_TYPES } from '@/constants'
import { INPUT_LETTERS, REQUIRED } from '@/constants/helper'
import forgotModalCover from '../../../../../public/assets/forgotModalCover.webp'
import loginModalCover from '../../../../../public/assets/loginModalCover.webp'
import logo from '../../../../../public/assets/logo.webp'
import sellerModalCover from '../../../../../public/assets/sellerModalCover.webp'
import signUpModalCover from '../../../../../public/assets/signUpModalCover.webp'
import { setActiveLoginForm } from '@/redux/features/booleanSlice'
import { setType } from '@/redux/features/userSlice'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { LockOutlined, PhoneOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { ProForm, ProFormInstance, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Flex } from 'antd'
import Image from 'next/image'
import { FC, MutableRefObject, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../styles.module.scss'

type Props = {
	formRef: MutableRefObject<ProFormInstance>
}

const ModalProfile: FC<Props> = ({ formRef }) => {
	const dispatch = useDispatch<AppDispatch>()
	const { activeLoginForm } = useAppSelector(state => state.boolean)
	const { type } = useAppSelector(state => state.userData)
	const create = activeLoginForm === 'create'
	const forgot = activeLoginForm === 'forgot'
	const user = activeLoginForm === 'user'
	const seller = activeLoginForm === 'seller'

	const handleLoginRegister = async () => {
		formRef?.current?.resetFields()

		if (user || forgot) {
			await dispatch(setActiveLoginForm('create'))
			await dispatch(setType(1))
		} else {
			await dispatch(setActiveLoginForm('user'))
		}
	}

	useEffect(() => {
		console.log(type)
	}, [type])

	return (
		<Flex className={styles.loginContainer} justify="space-between" gap={20}>
			<div className={styles.loginImage}>
				<Image alt="loginCover" src={create ? signUpModalCover : forgot ? forgotModalCover : seller ? sellerModalCover : loginModalCover} />
			</div>
			<Flex className={styles.loginForm} vertical>
				<Flex className={styles.loginHeader} justify="center" align="center" gap={10}>
					<Image src={logo} alt="loginForm" />
					<span>SOLITUDE</span>
				</Flex>
				<Flex className={styles.loginHeaderText} justify="center" vertical>
					<h1>{create ? 'Create an Account' : forgot ? 'Forgotten your Password?' : seller ? 'Got any products? Post it Here!' : `Hello, Let's Sign In`}</h1>
					<span>
						{create
							? 'Register New Solitude Account'
							: forgot
							? 'Enter your email to recover your Account!'
							: seller
							? 'Login as a Seller'
							: 'Please register or sign in'}
					</span>
				</Flex>
				<div
					className={styles.formContainer}
					style={{
						margin: `${forgot ? '2.5rem' : '3.5rem'} 0 0.5rem 0`
					}}
				>
					{create && (
						<ProFormSelect
							label="Type"
							fieldProps={{ defaultValue: 1, allowClear: false }}
							options={[
								{ label: 'SELLER', value: 2 },
								{ label: 'USER', value: 1 }
							]}
							colProps={{ span: 7 }}
							placeholder=""
							onChange={e => {
								dispatch(setType(e))
								formRef?.current?.resetFields(['email', 'username', 'first_name', 'last_name', 'password', 'phone', 'confirm_password'])
							}}
						/>
					)}
					<ProForm.Group>
						<ProFormText
							name="email"
							placeholder="your@email.com"
							label="Email Address"
							fieldProps={{ prefix: <UserOutlined /> }}
							colProps={create ? { span: 12 } : {}}
							rules={[
								...REQUIRED,
								{
									type: 'email',
									message: 'input is not email format!'
								}
							]}
						/>
						{create && <ProFormText name="username" placeholder="eg: johnsmith" label="Username" colProps={{ span: 12 }} rules={[...REQUIRED]} />}
					</ProForm.Group>
					{create && (
						<ProForm.Group>
							{type === USER_TYPES.USER ? (
								<>
									<ProFormText
										name="first_name"
										placeholder="eg: John"
										label="First Name"
										fieldProps={{
											prefix: <UserOutlined />,
											maxLength: 10
										}}
										colProps={{ span: 8 }}
										rules={[...REQUIRED]}
									/>
									<ProFormText
										name="last_name"
										placeholder="eg: Smith"
										label="Last Name"
										colProps={{ span: 8 }}
										fieldProps={{ maxLength: 10 }}
										rules={[...REQUIRED]}
									/>
								</>
							) : (
								<ProFormText
									name="seller_name"
									placeholder="YOUR STORE NAME"
									label="Store Name"
									colProps={{ span: 8 }}
									fieldProps={{ maxLength: 30 }}
									rules={[...REQUIRED]}
								/>
							)}
							<ProFormText
								name="phone"
								placeholder="+63 9*********"
								label="Phone Number"
								rules={[...REQUIRED]}
								fieldProps={{ prefix: <PhoneOutlined /> }}
								colProps={{ span: 8 }}
							/>
						</ProForm.Group>
					)}

					{!forgot && (
						<ProForm.Group>
							<ProFormText.Password
								{...INPUT_LETTERS}
								name="password"
								placeholder="Enter Password"
								label="Password"
								fieldProps={{ prefix: <LockOutlined /> }}
								colProps={create ? { span: 12 } : {}}
								rules={[...REQUIRED, { min: 6 }]}
							/>
							{create && (
								<ProFormText.Password
									{...INPUT_LETTERS}
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
							)}
						</ProForm.Group>
					)}
					{!forgot && !create && (
						<Flex justify="space-between">
							<span
								className={styles.userTypes}
								onClick={() => {
									if (type === USER_TYPES.USER) {
										dispatch(setActiveLoginForm('seller'))
										dispatch(setType(USER_TYPES.SELLER))
									} else {
										dispatch(setActiveLoginForm('user'))
										dispatch(setType(USER_TYPES.USER))
									}
									formRef?.current?.resetFields()
								}}
							>
								{type === USER_TYPES.USER ? 'Seller? Click here' : 'Buyer? Click here'}
							</span>
							<span
								className={styles.userTypes}
								onClick={() => {
									dispatch(setActiveLoginForm('forgot'))
									formRef?.current?.resetFields()
								}}
							>
								Forgot Password?
							</span>
						</Flex>
					)}
				</div>
				<Flex style={{ height: '100%' }} justify="end" vertical>
					<span
						className={styles.loginButton}
						style={{
							marginBlockStart: create ? '2rem' : forgot ? '0.4rem' : '2rem'
						}}
						onClick={() => {
							formRef.current?.submit()
						}}
					>
						{create ? 'SIGN IN' : forgot ? 'RECOVER YOUR ACCOUNT' : 'LOGIN'}
					</span>
					<Flex className={styles.createAccountContainer} justify="center" align="center">
						<span className={styles.userTypes} onClick={handleLoginRegister}>
							{create ? 'SIGN IN TO ACCOUNT' : 'CREATE AN ACCOUNT'}
						</span>
						<RightOutlined onClick={handleLoginRegister} />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default ModalProfile
