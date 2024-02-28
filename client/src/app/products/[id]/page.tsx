import { getProductData, getProducts } from '@/api'
import Content from './components/content'

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
			<Content data={data?.data} products={products?.data} />
		</div>
	)
}

export default ProductID
