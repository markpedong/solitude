import { TProduct, getAllProducts } from '@/api'
import { useAppSelector } from '@/redux/store'
import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Avatar, Card, Space } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import Image from 'next/image'

type Props = {}

const ProductsAdded: FC<Props> = () => {
    const { sellerData } = useAppSelector(state => state.userData)
    const [products, setProducts] = useState<TProduct[]>([])

    const fetchProducts = async () => {
        const data = await getAllProducts({ seller_id: sellerData?.seller_id })

        setProducts(data.data)
    }

    useEffect(() => {
        fetchProducts()
    }, [sellerData?.seller_id])

    return (
        <Space className={styles.addedProductsWrapper} direction='horizontal' wrap size={20} >
            {products?.map(q => (
                <Card
                    key={q.id}
                    hoverable
                    className={styles.addedProduct}
                    cover={<Image src={q.image?.[0]} width={300} height={150} alt="cover_image" />}
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}>
                    <Card.Meta
                        avatar={<Avatar src={q.image?.[0]} />}
                        title={q.product_name}
                        description={q.description}
                    />
                </Card>
            ))}
        </Space>
    )
}

export default ProductsAdded
