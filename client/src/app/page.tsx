import Landing from '@/components/landing'
import Collections from '@/components/landing/components/collections'
import Products from '@/components/landing/components/products'

const Page = () => {
    return (
        <div>
            <Landing />
            <Products />
            <Collections />
        </div>
    )
}

export default Page
