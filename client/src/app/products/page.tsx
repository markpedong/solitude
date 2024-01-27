import { TProduct, getProducts } from '@/api'
import Products from './components/products'

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

    return <Products data={products.data as unknown as TProduct[]} />
}

export default Page
