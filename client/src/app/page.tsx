import Landing from '@/components/landing'
import Blog from '@/components/landing/components/blog'
import Collections from '@/components/landing/components/collections'
import Products from '@/components/landing/components/products'

const Page = () => {
    return (
        <div>
            <Landing />
            <Products />
            <Collections />
            <Blog />
        </div>
    )
}

export default Page
