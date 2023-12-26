import { TProduct, getProducts } from '@/api'
import Products from './index'

const Page = async () => {
    const products = await getProducts()

    return <Products data={products.data as unknown as TProduct[]} />
}

export default Page
