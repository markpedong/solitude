import Profile from '@/components/profile'
import { clearUserData } from '@/constants/helper'
import { resetBooleanData } from '@/redux/features/booleanSlice'
import { resetUserData } from '@/redux/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { UserOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiChevronDown, FiEdit, FiLogOut, FiPlusSquare } from 'react-icons/fi'

const StaggeredDropDown = () => {
	const [open, setOpen] = useState(false)
	const { darkMode } = useAppSelector(s => s.boolean)
	const router = useRouter()
	const dispatch = useAppDispatch()

	return (
		<div className="flex items-center justify-center z-50">
			<motion.div animate={open ? 'open' : 'closed'} className="relative">
				<button
					onClick={() => setOpen(pv => !pv)}
					className={`flex items-center gap-[0.1rem] px-3 py-2 !duration-[50ms] transition-colors`}
				>
					<UserOutlined color={darkMode ? 'white' : 'black'} />
					<motion.span variants={iconVariants}>
						<FiChevronDown color={!darkMode ? 'black' : 'white'} />
					</motion.span>
				</button>

				<motion.ul
					initial={wrapperVariants.closed}
					variants={wrapperVariants}
					style={{ originY: 'top', translateX: '-50%' }}
					className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
				>
					<Option setOpen={setOpen} Icon={FiEdit} text={<Profile />} />
					<Option
						setOpen={setOpen}
						Icon={FiPlusSquare}
						text="Details"
						onClick={() => {
							router.push('/account')
							setOpen(false)
						}}
					/>
					<Option
						setOpen={setOpen}
						Icon={FiLogOut}
						text="Logout"
						onClick={async () => {
							clearUserData()
							dispatch(resetUserData())
							dispatch(resetBooleanData())
							router.push('/')
							router.refresh()
						}}
					/>
				</motion.ul>
			</motion.div>
		</div>
	)
}

const Option = ({ text, Icon, setOpen, ...props }) => {
	return (
		<motion.li
			variants={itemVariants}
			onClick={() => setOpen(false)}
			className={`flex items-center gap-2 w-full p-2 text-xs ${
				text === 'Logout' ? 'text-red-600' : ''
			} font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-gray-500  !duration-[50ms]  transition-colors  cursor-pointer`}
			{...props}
		>
			<motion.span variants={actionIconVariants}>
				<Icon color={text === 'Logout' ? 'rgb(220 38 38)' : 'black'} />
			</motion.span>
			{text}
		</motion.li>
	)
}

export default StaggeredDropDown

const wrapperVariants = {
	open: {
		scaleY: 1,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	},
	closed: {
		scaleY: 0,
		transition: {
			when: 'afterChildren',
			staggerChildren: 0.1
		}
	}
}

const iconVariants = {
	open: { rotate: 180 },
	closed: { rotate: 0 }
}

const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			when: 'beforeChildren'
		}
	},
	closed: {
		opacity: 0,
		y: -15,
		transition: {
			when: 'afterChildren'
		}
	}
}

const actionIconVariants = {
	open: { scale: 1, y: 0 },
	closed: { scale: 0, y: -7 }
}
