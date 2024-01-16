import { getBlogs, getCollections, getProducts } from '@/api'
import img1 from '@/public/assets/forgotModalCover.webp'
import landing from '@/public/assets/landing.webp'
import img3 from '@/public/assets/loginModalCover.webp'
import img2 from '@/public/assets/logo.webp'
import img4 from '@/public/assets/signUpModalCover.webp'
import classNames from 'classnames'
import { Cormorant, Jost } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './styles.module.scss'
import { Collection, Product } from '@/components/reusable'

export const cormorant = Cormorant({ weight: 'variable', subsets: ['latin'] })
export const jost = Jost({ weight: '400', subsets: ['latin'] })

const Page: FC = async () => {
    const products = await getProducts({})
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
                <div className={classNames(styles.landingButtonContainer, jost.className)}>
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
            <div className={styles.joinWrapper}>
                <div className={styles.imageContainer}>
                    <Image src={img1} alt="logo1" />
                    <Image src={img2} alt="logo1" />
                    <Image src={img3} alt="logo1" />
                    <Image src={img4} alt="logo1" />
                </div>
                <div className={styles.middleContainer}>
                    <h1 className={cormorant.className}>Join #solitude</h1>
                    <Link href="/">
                        <span className={jost.className}>FOLLOW US ON INSTAGRAM</span>
                    </Link>
                </div>
                <div className={styles.imageContainer}>
                    <Image src={img1} alt="logo1" />
                    <Image src={img2} alt="logo1" />
                    <Image src={img3} alt="logo1" />
                    <Image src={img4} alt="logo1" />
                </div>
            </div>
        </div>
    )
}

export default Page
