'use client'

import { CheckOutlined } from '@ant-design/icons'
import { Collapse, Divider, Slider } from 'antd'
import { FC, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './styles.module.scss'
import { scaleSize } from '@/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
	max: number
	min: number
}

const Filter: FC<Props> = ({ max, min }) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [priceArr, setPriceArr] = useState<number[]>([])

	console.log(max, min)

	const handleSubmitFilter = () => {
		const current = new URLSearchParams(Array.from(searchParams.entries())) // -> has to use this form

		if (!!!priceArr?.length) {
			current.delete('min')
			current.delete('max')
		} else {
			current.set('min', priceArr[0].toString())
			current.set('max', priceArr[1].toString())
		}

		const search = current.toString()
		const query = search ? `?${search}` : ''
		router.push(`${pathname}${query}`)
	}

	const memoizedFilter = useMemo(() =>  <Slider range min={min} max={max} onChange={e => setPriceArr(e)} />, [])

	return (
		<div className={styles.filterWrapper}>
			{/* <Divider />
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <div className={styles.collapseLabel}>T-shirts</div>,
						children: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, temporibus?</div>
					},
					{
						key: '2',
						label: <div className={styles.collapseLabel}>Shorts</div>,
						children: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, temporibus?</div>
					},
					{
						key: '3',
						label: <div className={styles.collapseLabel}>Jeans</div>,
						children: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, temporibus?</div>
					},
					{
						key: '4',
						label: <div className={styles.collapseLabel}>Hoodie</div>,
						children: <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, temporibus?</div>
					}
				]}
			/>
			<Divider /> */}
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <div className={styles.header}>Price</div>,
						children: memoizedFilter
					}
				]}
			/>
			{/* <Divider />
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <div className={styles.header}>Colors</div>,
						children: (
							<div className={styles.colorContainer}>
								<span>
									<CheckOutlined />
								</span>
								<span>
									<CheckOutlined />
								</span>
								<span>
									<CheckOutlined />
								</span>
								<span>
									<CheckOutlined />
								</span>
								<span>
									<CheckOutlined />
								</span>
								<span>
									<CheckOutlined />
								</span>
								<span>
									<CheckOutlined />
								</span>
								<span>
									<CheckOutlined />
								</span>
							</div>
						)
					}
				]}
			/>
			<Divider />
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <div className={styles.header}>Size</div>,
						children: (
							<div className={styles.sizeVariationContainer}>
								<span>small</span>
								<span>medium</span>
								<span>large</span>
								<span>x-large</span>
								<span>xx-large</span>
								<span>3x-large</span>
								<span>4x-large</span>
							</div>
						)
					}
				]}
			/>
			<Divider />
			<Collapse
				expandIconPosition={'end'}
				items={[
					{
						key: '1',
						label: <span className={styles.collapseLabel}>Dress Style</span>,
						children: (
							<Collapse
								expandIconPosition="end"
								items={[
									{
										label: <span className={styles.collapseLabel}>Casual</span>,
										children: <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, rem.</div>
									},
									{
										label: <span className={styles.collapseLabel}>Formal</span>,
										children: <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, rem.</div>
									},
									{
										label: <span className={styles.collapseLabel}>Party</span>,
										children: <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, rem.</div>
									},
									{
										label: <span className={styles.collapseLabel}>Gym</span>,
										children: <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, rem.</div>
									}
								]}
							/>
						)
					}
				]}
			/> */}
			<motion.div whileTap={scaleSize} className={styles.resetBtn} onClick={() => {
				router.push('/products')
				router.refresh()
			}}>
				Reset Filters
			</motion.div>
			<motion.div whileTap={scaleSize} className={styles.applyButton} onClick={handleSubmitFilter}>
				Apply Filters
			</motion.div>
		</div>
	)
}

export default Filter
