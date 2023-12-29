import { getProductData, getProducts } from '@/api'
import Collections from '@/app/components/collections'
import React, { FC } from 'react'
import Products from '..'
import Product from '@/components/products'

type Params = { params: { id: string } }

const ProductItem: FC<Params> = async ({ params }) => {
    const data = await getProductData({ id: params.id })
    const products = await getProducts()

    return (
        <div>
            {products.data.map(q => (
                <Product
                    description={q.description}
                    id={q.id}
                    image={q.image}
                    price={q.price}
                    product_name={q.product_name}
                    key={q.id}
                />
            ))}
        </div>
    )
}

export default ProductItem
