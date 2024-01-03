import { TBlog, TCollection, TProduct, getBlogs, getCollections, getProducts } from '@/api'
import Blog from '@/app/components/blog'
import Join from '@/app/components/join'
import { FC } from 'react'
import { Cormorant, Jost } from 'next/font/google'
import Product from '@/components/products'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import landing from '@/public/assets/landing.png'
import Collection from '@/components/collections'

export const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })
export const jost = Jost({ weight: '400', subsets: ['latin'] })

const Page: FC = async () => {
    const products = await getProducts()
    const blogs = await getBlogs()
    const collections = await getCollections()

    return (
        <div>
            <div>
                <div className={styles.headerContainerText}>
                    <span className={cormorant.className}>
                        Find products for your friends, family, and special occasions.
                    </span>
                </div>
                <div className={styles.landingImageContainer}>
                    <Image src={landing} alt="landing" />
                </div>
                <div className={styles.landingButtonContainer}>
                    <span>
                        <Link href="/products">SEARCH PRODUCTS</Link>
                    </span>
                    <span className={jost.className}>READ OUR CARE GUIDE</span>
                </div>
                <div className={styles.featuredContainer}>
                    <span className={cormorant.className}>Featured Products</span>
                    <span>Essential products, best values, lower prices</span>
                </div>
            </div>
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
            <div className={styles.headerText}>
                <span className={cormorant.className}>Featured Collections</span>
                <span className={jost.className}>SEE ALL COLLECTIONS</span>
            </div>
            <div className={styles.featuresItemContainer}>
                {collections.data.map(q => (
                    <Collection description={q.description} image={q.image} title={q.title} key={q.title} />
                ))}
            </div>
            {/* <Blog data={blogs.data as unknown as TBlog[]} /> */}
            <div className={styles.titleContainer}>
                <span className={cormorant.className}>Our Blog</span>
                <span className={jost.className}>More Articles</span>
            </div>
            <div className={styles.blogItemsContainer}>
                {blogs.data.map(q => (
                    <div className={styles.blogItem} key={q.image}>
                        <Image src={q.image} alt={q.image} width={1000} height={1000} />
                        <div className={styles.featuresTextContainer}>
                            <span className={cormorant.className} style={{ fontWeight: '' }}>
                                {q.title}
                            </span>
                            <span className={jost.className}>{q.description}</span>
                            <Link className={jost.className} href={q.blog_link} target="_blank">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Join />
        </div>
    )
}

export default Page
