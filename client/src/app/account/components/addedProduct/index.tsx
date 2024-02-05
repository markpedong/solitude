import { TProduct, getAllProducts } from '@/api'
import { useAppSelector } from '@/redux/store'
import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss';

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
        <div className={styles.addedProductsContainer}>
            {products?.map(q => (
                <></>
            ))}
        </div>
    )
}

export default ProductsAdded
