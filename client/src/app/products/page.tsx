import { getProducts } from '@/api'
import ProductList from './components/productsList'

const Products = async (params: any) => {
	const products = await getProducts({ search: params.searchParams.search })

	return (
		<div>
			<ProductList data={products?.data} />
		</div>
	)
}

export default Products
