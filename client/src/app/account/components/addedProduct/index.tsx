import { TProduct, getProductsData as getSellerProducts } from '@/api'
import { useAppSelector } from '@/redux/store'
import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flex, Popconfirm } from 'antd'
import { Cormorant, Jost } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ModalForm, ProForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { REQUIRED } from '@/constants/helper'
import AddProduct from '../addProduct'
import { scaleSize } from '@/constants'
import classNames from 'classnames'

const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })
const jost = Jost({ weight: '400', subsets: ['latin'] })
const jostHeavy = Jost({ weight: '700', subsets: ['latin'] })

type Props = {}

const ProductsAdded: FC<Props> = () => {
	const { sellerData } = useAppSelector(state => state.userData)
	const [products, setProducts] = useState<TProduct[]>([])
	const router = useRouter()

	const renderEditProduct = (product: TProduct) => {
		return (
			<ModalForm
				title={<span className={styles.modalTitle}>Product Details:</span>}
				initialValues={product}
				submitter={false}
				width={1200}
				trigger={
					<motion.div whileTap={scaleSize}>
						<EditOutlined style={{ cursor: 'pointer' }} />
					</motion.div>
				}
			>
				<AddProduct product={product} />
			</ModalForm>
		)
	}

	const fetchProducts = async () => {
		const data = await getSellerProducts({ seller_id: sellerData?.seller_id })

		setProducts(data.data)
	}

	useEffect(() => {
		fetchProducts()
	}, [sellerData?.seller_id])

	return (
		<div>
			{products?.map((q, i) => (
				<div className={styles.addProductContainer} style={{ background: i % 2 !== 0 ? '#F4F4F2' : '' }} key={q.product_id}>
					<div className={styles.imgContainer}>
						<Image src={q?.image?.[0]} alt="product" width={70} height={70} />
					</div>
					<div className={styles.productHeader} >
						<span  className={jostHeavy.className} onClick={() => router.push(`/products/${q.product_id}`)} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>
							{q.product_name}
						</span>
						<span className={styles.description}>{q.description}</span>
					</div>
					<Flex className={classNames(jost.className, styles.priceContainer)} vertical>
						<div className={styles.priceContainer}>
							{!!!q?.discount_price ? <span className={styles.price}>₱{q?.price}</span> : <span className={styles.price}>₱{q?.discount_price}</span>}
							{!!q?.discount_price && <span className={styles.price}>₱{q?.price}</span>}
							{!!q?.discount && <span className={styles.price}>-{q?.discount}%</span>}
						</div>
					</Flex>
					<div>
						{renderEditProduct(q)}
						<motion.div whileTap={scaleSize}>
							<Popconfirm title={`Delete this product?`}>
								<DeleteOutlined />
							</Popconfirm>
						</motion.div>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProductsAdded
