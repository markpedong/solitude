import { getProductData, getProducts } from '@/api'
import { FC } from 'react'
import ProductDetails from './components/productDetails'
type Params = { params: { id: string } }

const ProductItem: FC<Params> = async ({ params }) => {
    const data = await getProductData({ product_id: params.id }, false)
    // const products = await getProducts({})
    // const filtered = products.data.filter(q => q.id !== params.id)

    return (
        <div>
            <ProductDetails data={data.data} />
        </div>
    )
}

export default ProductItem
