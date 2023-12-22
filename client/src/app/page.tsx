import Landing from '@/components/landing'
import Blog from '@/components/landing/components/blog'
import Collections from '@/components/landing/components/collections'
import Join from '@/components/landing/components/join'
import Products from '@/components/landing/components/products'
import { FC } from 'react'
import { getProducts } from '@/api/index'

const Page: FC = async () => {
    const products = await getProducts({})

    console.log('LOREMLOREMLOREM', products)
    return (
        <div>
            <Landing />
            <div style={{ marginBlockStart: '70dvh' }} />
            <Products />
            <Collections />
            <Blog />
            <Join />
        </div>
    )
}

export default Page
