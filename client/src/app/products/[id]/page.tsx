import { getProductData, getProducts } from '@/api'
import { FC } from 'react'
import ProductDetails from '.'

type Params = { params: { id: string } }

const ProductItem: FC<Params> = async ({ params }) => {
    const data = await getProductData({ id: params.id })
    const products = await getProducts({})
    const filtered = products.data.filter(q => q.id !== params.id)

    return (
        <div>
            <ProductDetails data={data.data} list={filtered} />
        </div>
    )
}

export default ProductItem
