import Image from 'next/image'
import styles from './styles.module.scss'

const Page = async () => {
	return (
		<div className={styles.mainWrapper}>
			<div className={styles.textContainer}>
				<span>FIND CLOTHES THAT MATCHES YOUR STYLE</span>
				<span>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</span>
			</div>
			<div className={styles.imageContainer}>
				<Image src="/assets/landingCover.png" alt="landing_cover" width={300} height={500} />
				<Image src="/assets/star1.png" alt="landing_cover" width={100} height={100} />
				<Image src="/assets/star2.png" alt="landing_cover" width={100} height={100} />
			</div>
		</div>
	)
}

export default Page
