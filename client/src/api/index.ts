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

// /users/signup
export const userSignup = params => post('/users/signup', params)

// /users/login
export const userLogin = params => post<UserData>('/users/login', params)

// /users/loginSeller
export const sellerLogin = params => post('/users/loginSeller', params)

// /users/signupSeller
export const sellerSignup = params => post('/users/signupSeller', params)

// /users/products
export type TProduct = {
	categories: string[]
	product_id: string
	product_name: string
	price: number
	image: string[]
	created_at: number
	description: string
	stock: number
	variations: TVariations[]
	rating: number
}

export const getProducts = params => post<TProduct[]>('/users/products', params)

// /api/collections
export type TCollection = {
	image: string
	title: string
	description: string
	link: string
}
export const getCollections = () => get<TCollection[]>('/users/collections')

// /users/getProductData
export const getProductData = (params, client = true) => post<TProduct>(`/users/getProductData`, params, client)

// /api/updateUser
export const updateUserData = params => post('/api/updateUser', params)

// /api/updateSeller
export const updateSellerData = params => post('/api/updateSeller', params)

// /api/getUserData
export const getUserData = params => post('/users/getUserData', params)

// /users/getSellerData
export type SellerData = {
	seller_id: string
	created_at: string
	updated_at: string
	seller_name: string
	phone: string
	location: string
	avatar: string
	products: number
}
export const getSellerData = params => post<SellerData>('/users/getSellerData', params)

// /api/uploadImage
export const uploadImages = params => upload('/api/uploadImage', params)

// /api/addProduct
export const addProduct = params => post('/api/add-product', params)

// /api/getProductsByID
export const getProductsData = params => post('/users/getProductsByID', params)

// /users/getVariationsByID
export type TVariations = {
	id: string
	product_id: string
	label: string
	value: string[]
}
export const getVariations = params => post('/users/getVariationsByID', params)

// /api/add-to-cart
export const addToCart = params => post('/api/add-to-cart', params)
