import { ProductsArr, getProducts } from '@/api'
import Blog from '@/components/blog'
import Collections from '@/components/collections'
import Join from '@/components/join'
import Landing from '@/components/landing'
import Products from '@/components/products'
import { FC } from 'react'

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
