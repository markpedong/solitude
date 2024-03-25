import { getProducts, getReviews, getSellerData, getSellerProducts } from '@/api'

type Props = {
	params: {
		id: string
	}
}

const Page = async (props: Props) => {
	const products = await getSellerProducts({ selle_id: props.params.id })
	const sellerData = await getSellerData({ seller_id: props.params.id })
	const reviews = await getReviews({ seller_id: props.params.id })

	return <div className="max-w-6xl mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, reprehenderit?</div>
}

export default Page
