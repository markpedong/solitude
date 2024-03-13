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
	seller_id: string
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
	discount: number
	discount_price: number
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
	rating: number
	followers: number
}
export const getSellerData = params => post<SellerData>('/users/getSellerData', params)

// /api/uploadImage
export const uploadImages = params => upload<any>('/api/uploadImage', params)

// /api/addProduct
export const addProduct = params => post('/api/add-product', params)

// /api/getAllProductsByID
export const getProductsData = params => post<TProduct[]>('/users/getAllProductsByID', params)

// /variations/get
export type TVariations = {
	id: string
	product_id: string
	label: string
	value: { value: string; id: string }[]
}
export const getVariations = params => post('/variations/get', params)

// /cart/add
export const addToCart = params => post('/cart/add', params)

// /cart/get
export type CartItem = {
	checkout_id: string
	image: string[]
	price: 129
	product_id: string
	product_name: string
	seller_id: string
	discount: number
	discount_price: number
	variations: {
		id: string
		product_id: string
		label: string
		value: { value: string }[]
	}[]
	quantity: number
}
export const checkCart = params => post<CartItem[]>('/cart/get', params)

// /cart/remove
export const removeCart = params => post('/cart/remove', params)

// /delivery/add
export const addDeliveryInfo = params => post('/delivery/add', params)

// /delivery/get
export type InfoItem = {
	address_type: number
	city: string
	created_at: number
	first_name: string
	house: string
	id: string
	last_name: string
	phone: string
	pin_code: string
	street: string
	updated_at: number
	user_id: string
}
export const getDeliveryInfo = params => post<InfoItem[]>('/delivery/get', params)

// /delivery/edit
export const editDeliveryInfo = params => post('/delivery/edit', params)

// /delivery/delete
export const deleteDeliveryInfo = params => post<InfoItem[]>('/delivery/delete', params)

// /api/checkout
export const checkout = params => post('/api/checkout', params)

// /cart/orders
export type OrderItem = {
	product_id: string
	seller_id: string
	product_name: string
	price: number
	image: string[]
	discount: number
	discount_price: number
	rating: number
	description: string
	quantity: string
	variations: {
		id: string
		product_id: string
		label: string
		value: { value: string }[]
	}[]
	status: number
	seller_name: string
}
export const getOrders = params => post<OrderItem[]>('/cart/orders', params)
