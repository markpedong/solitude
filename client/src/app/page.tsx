import { TBlog, TCollection, TProduct, getBlogs, getCollections, getProducts } from '@/api'
import Blog from '@/app/components/blog'
import Join from '@/app/components/join'
import Landing from '@/app/components/landing'
import Collections from '@/app/components/collections'
import { FC } from 'react'
import { Cormorant, Jost } from 'next/font/google'
import Product from '@/components/products'
import styles from './styles.module.scss'

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
            <div className={styles.productWrapper}>
                <div className={styles.carousel}>
                    {products.data.map(q => (
                        <Product
                            description={q.description}
                            id={q.id}
                            image={q.image}
                            price={q.price}
                            product_name={q.product_name}
                            key={q.id}
                        />
                    ))}
                </div>
            </div>
            <Collections data={collections.data as unknown as TCollection[]} />
            <Blog data={blogs.data as unknown as TBlog[]} />
            <Join />
        </div>
    )
}

export default Page
