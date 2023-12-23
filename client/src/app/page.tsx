import Landing from '@/components/landing'
import Blog from '@/components/landing/components/blog'
import Collections from '@/components/landing/components/collections'
import Join from '@/components/landing/components/join'
import Products from '@/components/landing/components/products'
import { FC } from 'react'
import { ProductsArr, getProducts } from '@/api/index'

// async function getProducts() {
//     const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`)
//     const response = await data.json()

//     return response
// }

const Page: FC = async () => {
    const products = await getProducts()

    return (
        <div>
            <Landing />
            <div style={{ marginBlockStart: '70dvh' }} />
            <Products data={products.data as unknown as ProductsArr[]} />
            <Collections />
            <Blog />
            <Join />
        </div>
    )
}

export default Page
