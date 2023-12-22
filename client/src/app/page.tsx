import Landing from '@/components/landing'
import Blog from '@/components/landing/components/blog'
import Collections from '@/components/landing/components/collections'
import Join from '@/components/landing/components/join'
import Products from '@/components/landing/components/products'
import { FC } from 'react'
import { ProductsArr, getProducts } from '@/api/index'

const Page: FC = async () => {
    const products = await getProducts({})

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
