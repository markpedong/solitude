import { TProduct, getAllProducts } from '@/api'
import { useAppSelector } from '@/redux/store'
import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flex, Popconfirm } from 'antd'
import { Cormorant, Jost } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { ModalForm } from '@ant-design/pro-components'

const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })
const jost = Jost({ weight: '400', subsets: ['latin'] })
const jostHeavy = Jost({ weight: '700', subsets: ['latin'] })

type Props = {}

const ProductsAdded: FC<Props> = () => {
    const { sellerData } = useAppSelector(state => state.userData)
    const [products, setProducts] = useState<TProduct[]>([])
    const router = useRouter()

    const renderEditProduct = () => {
        return (
            <ModalForm
                title="Product Details:"
                trigger={
                    <motion.div whileTap={{ scale: 0.9 }}>
                        <EditOutlined />
                    </motion.div>
                }></ModalForm>
        )
    }

    const fetchProducts = async () => {
        const data = await getAllProducts({ seller_id: sellerData?.seller_id })

        setProducts(data.data)
    }

    useEffect(() => {
        fetchProducts()
    }, [sellerData?.seller_id])

    return (
        <div>
            {products?.map(q => (
                <div className={styles.addProductContainer}>
                    <Flex justify="center" align="center">
                        <Image src={q?.image?.[0]} alt="product" width={100} height={100} />
                    </Flex>
                    <div className={jostHeavy.className}>
                        <span onClick={() => router.push(`/products/${q.product_id}`)} style={{ cursor: 'pointer' }}>
                            {q.product_name}
                        </span>
                    </div>
                    <Flex className={jost.className} vertical>
                        <span>{q.description}</span>
                        <span>₱ {q.price?.toFixed(2)}</span>
                    </Flex>
                    <div>
                        {renderEditProduct()}
                        <motion.div whileTap={{ scale: 0.9 }}>
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
