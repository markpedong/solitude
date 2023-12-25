import { TBlog, TCollection, TProduct, getBlogs, getCollections, getProducts } from '@/api'
import Blog from '@/app/components/blog'
import Join from '@/app/components/join'
import Landing from '@/app/components/landing'
import Products from '@/app/components/products'
import Collections from '@/app/components/collections'
import { FC } from 'react'
import { Cormorant, Jost } from 'next/font/google'

export const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })
export const jost = Jost({ weight: '400', subsets: ['latin'] })

const Page: FC = async () => {
    const products = await getProducts()
    const blogs = await getBlogs()
    const collections = await getCollections()

    return (
        <div>
            <Landing />
            <div style={{ marginBlockStart: '70dvh' }} />
            <Products data={products.data as unknown as TProduct[]} />
            <Collections data={collections.data as unknown as TCollection[]} />
            <Blog data={blogs.data as unknown as TBlog[]} />
            <Join />
        </div>
    )
}

export default Page
