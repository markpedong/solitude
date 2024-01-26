import { TProduct, getProducts } from '@/api'
import Products from './products'

const Page = async () => {
    const products = await getProducts({})

    return <Products data={products.data as unknown as TProduct[]} />
}

export default Page
