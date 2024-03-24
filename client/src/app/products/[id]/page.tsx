import { getProductData, getProducts, getReviews, getSellerData } from '@/api'
import Content from './components/content'

type Props = {
	params: {
		id: string
	}
}

const ProductID = async (props: Props) => {
	const data = await getProductData({ product_id: props.params.id })
	const products = await getProducts({})
	const sellerData = await getSellerData({ seller_id: data?.data?.seller_id })
	const reviews = await getReviews({ product_id: props.params.id })

	return (
		<div>
			<Content data={data?.data} reviews={reviews?.data} products={products?.data} seller={sellerData?.data} />
		</div>
	)
}

export default ProductID
