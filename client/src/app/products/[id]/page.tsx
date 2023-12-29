import { getProductData } from '@/api'
import React, { FC } from 'react'

type Params = { params: { id: string } }

const ProductItem: FC<Params> = async ({ params }) => {
    const data = await getProductData({ id: params.id })
    return <div>{JSON.stringify(data)}</div>
}

export default ProductItem
