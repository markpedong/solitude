import { get, post } from './http'

export const signUp = params => post('/users/signup', params)

export const login = params => post('/users/login', params)

// /api/products
export type ProductsArr = {
    id: string
    product_name: string
    price: number
    rating: number
    image: string
    created_at: number
}

export const getProducts = params => get<ProductsArr[]>('/api/products', params)
