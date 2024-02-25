import { getProducts } from '@/api'
import ProductList from './components/productsList'

const Products = async () => {
	const products = await getProducts({})

	return (
		<div>
			<ProductList data={products?.data} />
		</div>
	)
}

export default Products
