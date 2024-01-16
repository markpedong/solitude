import React from 'react'
import Account from '.'
import { TProduct, getProducts } from '@/api'

const Page = async () => {
    const products = await getProducts({})
    return (
        <div>
            <Account products={products.data} />
        </div>
    )
}

export default Page
