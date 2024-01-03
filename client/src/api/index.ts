import { get, post } from './http'

export const signUp = params => post('/users/signup', params)

export const login = params => post('/users/login', params)

// /api/products
export type TProduct = {
    id: string
    product_name: string
    price: number
    image: string
    created_at: number
    description: string
}

export const getProducts = () => get<TProduct[]>('/api/products')

// /api/blogs
export type TBlog = {
    id: string
    title: string
    description: string
    image: string
    blog_link: string
    created_at: number
}
export const getBlogs = () => get<TBlog[]>('/api/blogs')

// /api/collections
export type TCollection = {
    image: string
    title: string
    description
}
export const getCollections = () => get<TCollection[]>('/api/collections')

// /api/getProductData
export const getProductData = ({ id }) => get<TProduct>(`/api/product/${id}`)
