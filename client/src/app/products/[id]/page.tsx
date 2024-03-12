import { getProductData, getProducts, getSellerData } from '@/api'
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

	return (
		<div>
			<Content data={data?.data} products={products?.data} seller={sellerData?.data} />
		</div>
	)
}

export default ProductID
