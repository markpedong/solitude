import { LandingContent, PageHeader, ReviewComp,  } from '@/components/reusable'
import Image from 'next/image'
import styles from './styles.module.scss'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

const Page = async () => {
	return (
		<>
			<div className={styles.mainWrapper}>
				<div className={styles.textContainer}>
					<span className={styles.mainText}>FIND CLOTHES THAT MATCHES YOUR STYLE</span>
					<span className={styles.extraText}>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</span>
					<div className={styles.buttonContainer}>Shop Now</div>
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
					<Image src="/assets/landing/landingCover.png" alt="landing_cover" width={300} height={500} />
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
			<LandingContent title="new arrival" />
			<LandingContent title="top selling" />
			<div className={styles.categoryWrapper}>
				<PageHeader title="browse by dress style" />
				<div className={styles.categoryContainer}>
					<div className={styles.div1}>
						<span>casual</span>
						<Image src={'/assets/landing/casual.png'} alt="casual" height={100} width={100} />
					</div>
					<div className={styles.div2}>
						<span>formal</span>
						<Image src={'/assets/landing/formal.png'} alt="formal" height={100} width={100} />
					</div>
					<div className={styles.div3}>
						<span>formal</span>
						<Image src={'/assets/landing/party.png'} alt="party" height={100} width={100} />
					</div>
					<div className={styles.div4}>
						<span>gym</span>
						<Image src={'/assets/landing/gym.png'} alt="gym" height={100} width={100} />
					</div>
				</div>
			</div>
			<div className={styles.reviewWrapper}>
				<div className={styles.reviewContainer}>
					<span className={styles.header}>our happy customers</span>
					<div className={styles.arrowContainer}>
						<ArrowLeftOutlined />
						<ArrowRightOutlined />
					</div>
				</div>
				<div className={styles.reviewsContainer}>
					<ReviewComp />
					<ReviewComp />
					<ReviewComp />
					<ReviewComp />
					<ReviewComp />
				</div>
			</div>
		</>
	)
}

export default Page
