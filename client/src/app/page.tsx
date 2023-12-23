import { ProductsArr, getProducts } from '@/api'
import Blog from '@/app/components/blog'
import Collections from '@/app/components/collections'
import Join from '@/app/components/join'
import Landing from '@/app/components/landing'
import Products from '@/app/components/products'
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
