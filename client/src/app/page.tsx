import img1 from '@/public/assets/forgotModalCover.webp'
import landing from '@/public/assets/landing.webp'
import img3 from '@/public/assets/loginModalCover.webp'
import img2 from '@/public/assets/logo.webp'
import img4 from '@/public/assets/signUpModalCover.webp'
import classNames from 'classnames'
import { Cormorant, Jost } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'
import { getCollections, getProducts } from '@/api'

const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })
const jost = Jost({ weight: '400', subsets: ['latin'] })

const Page = async () => {
    return <>hello world</>
}

export default Page
