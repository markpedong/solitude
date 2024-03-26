import { getSellerData, getSellerProducts, getSellerRatings } from '@/api'
import Content from './components/content'

type Props = {
	params: {
		id: string
	}
}

const Page = async (props: Props) => {
	const products = await getSellerProducts({ seller_id: props.params.id })
	const sellerData = await getSellerData({ seller_id: props.params.id })
	const reviews = await getSellerRatings({ seller_id: props.params.id })

	return (
		<div className="max-w-6xl mx-auto">
			<Content products={products?.data} data={sellerData?.data} reviews={reviews?.data} />
		</div>
	)
}

export default Page
