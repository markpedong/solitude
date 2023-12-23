import { ProductsArr, getProducts } from '@/api'
import Landing from '@/app/components/landing'
import Blog from '@/app/components/landing/components/blog'
import Collections from '@/app/components/landing/components/collections'
import Join from '@/app/components/landing/components/join'
import ProductsLanding from '@/app/components/landing/components/products'
import { FC } from 'react'

const Page: FC = async () => {
    const products = await getProducts()

    return (
        <div>
            <Landing />
            <div style={{ marginBlockStart: '70dvh' }} />
            <ProductsLanding data={products.data as unknown as ProductsArr[]} />
            <Collections />
            <Blog />
            <Join />
        </div>
    )
}

export default Page
