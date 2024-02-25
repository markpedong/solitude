import { getProductData } from '@/api'
import ProductDetails from './components/productDetails'

type Props = {
	params: {
		id: string
	}
}

const ProductID = async (props: Props) => {
	const data = await getProductData({ product_id: props.params.id })

	return (
		<div>
			<ProductDetails data={data?.data} />
		</div>
	)
}

export default ProductID
