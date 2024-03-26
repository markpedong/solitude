'use client'

import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Divider, Input } from 'antd'
import { FacebookOutlined, GithubOutlined, InstagramOutlined, MailOutlined, TwitterOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { subscribeNewsLetter } from '@/api'
import { messageHelper } from '@/constants/antd'
import { motion } from 'framer-motion'
import { scaleSize } from '@/constants'

const Footer = () => {
	const [email, setEmail] = useState('')

	const handleSubscription = async () => {
		const res = await subscribeNewsLetter({ email })
		messageHelper(res)
	}
	return (
		<div className={styles.footerWrapper}>
			<div className={styles.newsLetterContainer}>
				<span className={styles.title}>STAY UPTO DATE ABOUT OUR LATEST OFFERS</span>
				<div className={styles.inputContainer}>
					<Input
						className={styles.input}
						prefix={<MailOutlined />}
						value={email}
						placeholder="Enter your email address"
						variant="filled"
						onChange={e => {
							const trimmedValue = e?.target.value?.trim()
							const validEmail = trimmedValue.replace(/[^\w.@+-]/g, '') // Remove characters not allowed in an email address

							setEmail(validEmail)
						}}
					/>
					<motion.div className={styles.button} whileTap={scaleSize} onClick={handleSubscription}>
						subscribe to newsletter
					</motion.div>
				</div>
			</div>
			<div className={styles.mainFooterContainer}>
				<div className={styles.titleContainer}>
					<span className={styles.title}>SOLITUDE</span>
					<span className={styles.extraText}>
						We offer products that complement your style and that you're proud to own. From a variety of
						categories to suit every preference.
					</span>
					<div className={styles.iconContainer}>
						<TwitterOutlined />
						<FacebookOutlined />
						<InstagramOutlined />
						<GithubOutlined />
					</div>
				</div>
				<div className={styles.extraContainer}>
					<div>
						<div>COMPANY</div>
						<span>About</span>
						<span>Features</span>
						<span>Works</span>
						<span>Career</span>
					</div>
					<div>
						<div>HELP</div>
						<span>Customer Support</span>
						<span>Delivery Details</span>
						<span>Terms & Conditions</span>
						<span>Privacy Policy</span>
					</div>
					<div>
						<div>FAQ</div>
						<span>Account</span>
						<span>Manage Deliveries</span>
						<span>Orders</span>
						<span>Payments</span>
					</div>
					<div>
						<div>RESOURCES</div>
						<span>Free eBooks</span>
						<span>Development Tutorial</span>
						<span>How to - Blog</span>
						<span>Youtube Playlist</span>
					</div>
				</div>
			</div>
			<div className={styles.extraFooterContainer}>
				<Divider />
				<div className={styles.reservedContainer}>
					<span className={styles.text}>SOLITUDE © 2024, All rights reserved</span>
					<div className={styles.cardContainer}>
						<Image src="/assets/footer/visa.svg" alt="visa" height={100} width={100} />
						<Image src="/assets/footer/mastercard.svg" alt="mastercard" height={100} width={100} />
						<Image src="/assets/footer/paypal.svg" alt="paypal" height={100} width={100} />
						<Image src="/assets/footer/apple.svg" alt="apple" height={100} width={100} />
						<Image src="/assets/footer/google.svg" alt="google" height={100} width={100} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
