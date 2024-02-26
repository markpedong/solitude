import { getProductData, getProducts } from '@/api'
import ProductDetails from './components/productDetails'

type Props = {
	params: {
		id: string
	}
}

const ProductID = async (props: Props) => {
	const data = await getProductData({ product_id: props.params.id })
	const products = await getProducts({})

	return (
		<div>
			<ProductDetails data={data?.data} products={products?.data} />
		</div>
	)
}

export default ProductID
