import { getProducts } from '@/api'
import ProductList from './components/productsList'

const Products = async (params: any) => {
	const { search = '', min = '', max = '' } = params.searchParams
	const products = await getProducts({ search, min, max })

	return (
		<div>
			<ProductList data={products?.data} />
		</div>
	)
}

export default Products
