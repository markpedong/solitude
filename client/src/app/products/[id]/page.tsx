import { getVariations, getProductData } from '@/api'
import { FC } from 'react'
import ProductDetails from './components/productDetails'
import styles from './components/productDetails/styles.module.scss'

type Params = { params: { id: string } }

const ProductItem: FC<Params> = async ({ params }) => {
    const data = await getProductData({ product_id: params.id })
    // const products = await getProducts({})
    // const filtered = products.data.filter(q => q.id !== params.id)

    return (
        <div className={styles.mainWrapper}>
            <ProductDetails data={data.data} />
        </div>
    )
}

export default ProductItem
