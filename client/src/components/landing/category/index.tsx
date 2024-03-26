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
				<span>clothing</span>
				<Image src={'/assets/landing/formal.png'} alt="formal" height={100} width={100} />
			</motion.div>
			<motion.div className={styles.div2} whileHover={scaleSizeBig}>
				<span>merchandise</span>
				<Image src={'/assets/landing/merchandise.jpeg'} alt="merchandise" height={100} width={100} />
			</motion.div>
			<motion.div className={styles.div3} whileHover={scaleSizeBig}>
				<span>household</span>
				<Image src={'/assets/landing/household.jpeg'} alt="household" height={100} width={100} />
			</motion.div>
			<motion.div className={styles.div4} whileHover={scaleSizeBig}>
				<span>crafting</span>
				<Image src={'/assets/landing/crafting.jpeg'} alt="crafting" height={100} width={100} />
			</motion.div>
		</div>
	)
}

export default CategoryEl
