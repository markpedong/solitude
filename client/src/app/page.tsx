import { LandingContent, PageHeader, ReviewComp } from '@/components/reusable'
import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'
import CategoryEl from '@/components/landing/category'
import { getProducts, getReviews } from '@/api'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Page = async () => {
	const products = await getProducts({ search: '' })
	const reviews = await getReviews({})

	return (
		<>
			<div className={styles.mainWrapper}>
				<div className={styles.textContainer}>
					<span className={styles.mainText}>FIND PRODUCTS THAT MATCHES YOUR NEEDS</span>
					<span className={styles.extraText}>
						Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
					</span>
					<Link href={'/products'} className={styles.buttonContainer}>
						Shop Now
					</Link>
					<div className={styles.footerTextContainer}>
						<div>
							<span>200+</span>
							<span>International Brands</span>
						</div>
						<div>
							<span>2000+</span>
							<span>High Quality Products</span>
						</div>
						<div>
							<span>10000+</span>
							<span>Happy Customer</span>
						</div>
					</div>
				</div>
				<div className={styles.imageContainer}>
					<Image src="/assets/landing/landingCover.png" alt="landing_cover" width={300} height={500} priority />
					<Image src="/assets/landing/star1.png" alt="landing_cover" width={100} height={100} />
					<Image src="/assets/landing/star2.png" alt="landing_cover" width={100} height={100} />
				</div>
			</div>
			<div className={styles.footerWrapper}>
				<div className={styles.footerContainer}>
					<Image src="/assets/footer/versace.png" alt="versace" width={100} height={100} />
					<Image src="/assets/footer/zara.png" alt="zara" width={100} height={100} />
					<Image src="/assets/footer/gucci.png" alt="gucci" width={100} height={100} />
					<Image src="/assets/footer/prada.png" alt="prada" width={100} height={100} />
					<Image src="/assets/footer/ck.png" alt="ck" width={100} height={100} />
				</div>
			</div>
			<LandingContent title="new arrival" products={products?.data} />
			<LandingContent title="top selling" products={products?.data} />
			<div className={styles.categoryWrapper}>
				<PageHeader title="browse by dress style" />
				<CategoryEl />
			</div>
			<div className={styles.reviewWrapper}>
				<div className={styles.reviewContainer}>
					<span className={styles.header}>our happy customers</span>
					{reviews?.data?.length > 6 && (
						<div className={styles.arrowContainer}>
							<FaArrowLeft />
							<FaArrowRight />
						</div>
					)}
				</div>
				<div className={styles.reviewsContainer}>
					{reviews?.data?.map(q => (
						<ReviewComp data={q} />
					))}
				</div>
			</div>
		</>
	)
}

export default Page
