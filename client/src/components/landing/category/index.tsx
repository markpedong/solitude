'use client'

import React, { FC } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { scaleSizeBig } from '@/constants'


const CategoryEl: FC = () => {
	return (
		<div className={styles.categoryContainer}>
			<motion.div className={styles.div1} whileHover={scaleSizeBig}>
				<span>casual</span>
				<Image src={'/assets/landing/casual.png'} alt="casual" height={100} width={100} />
			</motion.div>
			<motion.div className={styles.div2} whileHover={scaleSizeBig}>
				<span>formal</span>
				<Image src={'/assets/landing/formal.png'} alt="formal" height={100} width={100} />
			</motion.div>
			<motion.div className={styles.div3} whileHover={scaleSizeBig}>
				<span>formal</span>
				<Image src={'/assets/landing/party.png'} alt="party" height={100} width={100} />
			</motion.div>
			<motion.div className={styles.div4} whileHover={scaleSizeBig}>
				<span>gym</span>
				<Image src={'/assets/landing/gym.png'} alt="gym" height={100} width={100} />
			</motion.div>
		</div>
	)
}

export default CategoryEl
