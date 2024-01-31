import { get, post, upload } from './http'

export type UserData = {
    id: string
    created_at: string
    updated_at: string
    user_cart: []
    address_details: []
    orders: []
    password: string
    email: string
}

export const userSignup = params => post('/users/signup', params)

export const userLogin = params => post<UserData>('/users/login', params)

// /public/products
export type TProduct = {
    id: string
    product_name: string
    price: number
    image: string
    created_at: number
    description: string
}

export const getProducts = params => post<TProduct[]>('/users/products', params)

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
export const getCollections = () => get<TCollection[]>('/users/collections')

// /api/getProductData
export const getProductData = (params) => post<TProduct>(`/api/product`, params)

// /api/updateUser
export const updateUserData = params => post('/api/updateUser', params)

// /api/getUserData
export const getUserData = params => post('/users/getUserData', params)

// /api/uploadImage
export const uploadImages = params => upload('/api/uploadImage', params)

// /api/addProduct
export const addProduct = params => post('/api/add-product', params)
