import React from 'react'
import Account from './components/account'
import { getProducts } from '@/api'

// async function getProducts(params) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
//         body: params,
//         method: 'POST',
//     })
//     const data = await res.json()
//     return data
// }

const Page = async () => {
    const products = await getProducts({})

    return (
        <div>
            <Account products={products.data} />
        </div>
    )
}

export default Page
