import { getVariations, getProductData, getSellerData } from '@/api'
import { FC } from 'react'
import ProductDetails from './components/productDetails'
import styles from './components/productDetails/styles.module.scss'
import Seller from './components/seller'

type Params = { params: { id: string } }

const ProductItem: FC<Params> = async ({ params }) => {
    const data = await getProductData({ product_id: params.id })
    const seller = await getSellerData({seller_id: data?.data?.seller_id})
    
    return (
        <div className={styles.mainWrapper}>
            <ProductDetails data={data.data} />
            <Seller  data={seller.data}/>
        </div>
    )
}

export default ProductItem
