import { get, post } from './http'

export const userSignup = params => post('/users/signup', params)

export const userLogin = params => post('/users/login', params)

// /public/products
export type TProduct = {
    id: string
    product_name: string
    price: number
    image: string
    created_at: number
    description: string
}

export const getProducts = params => post<TProduct[]>('/public/products', params)

// /api/blogs
export type TBlog = {
    id: string
    title: string
    description: string
    image: string
    link: string
    created_at: number
}
export const getBlogs = () => get<TBlog[]>('/api/blogs')

// /api/collections
export type TCollection = {
    image: string
    title: string
    description: string
    link: string
}
export const getCollections = () => get<TCollection[]>('/api/collections')

// /api/getProductData
export const getProductData = ({ id }) => get<TProduct>(`/api/product/${id}`)
