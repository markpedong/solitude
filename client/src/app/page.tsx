import Footer from '@/components/footer'
import Landing from '@/components/landing'
import Blog from '@/components/landing/components/blog'
import Collections from '@/components/landing/components/collections'
import Join from '@/components/landing/components/join'
import Products from '@/components/landing/components/products'

const Page = () => {
    return (
        <div>
            <Landing />
            <Products />
            <Collections />
            <Blog />
            <Join />
            <Footer />
        </div>
    )
}

export default Page
