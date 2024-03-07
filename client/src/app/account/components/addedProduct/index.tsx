import { TProduct, getProductsData } from '@/api'
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
				title="Product Details:"
				initialValues={product}
				submitter={false}
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
		const data = await getProductsData({ seller_id: sellerData?.seller_id })

		setProducts(data.data)
	}

	useEffect(() => {
		fetchProducts()
	}, [sellerData?.seller_id])

	return (
		<div>
			{products?.map((q, i) => (
				<div className={styles.addProductContainer} style={{ background: i % 2 !== 0 ? '#F4F4F2' : '' }} key={q.product_id}>
					<Flex justify="center" align="center" style={{ paddingRight: '1rem' }}>
						<Image src={q?.image?.[0]} alt="product" width={100} height={100} />
					</Flex>
					<div className={jostHeavy.className}>
						<span onClick={() => router.push(`/products/${q.product_id}`)} style={{ cursor: 'pointer', textTransform: 'capitalize' }}>
							{q.product_name}
						</span>
					</div>
					<Flex className={jost.className} vertical>
						<span className={styles.description}>{q.description}</span>
						<span>₱ {q.price?.toFixed(2)}</span>
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
