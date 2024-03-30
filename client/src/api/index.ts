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

// /public/signup
export const userSignup = params => post('/public/signup', params)

// /public/login
export const userLogin = params => post<UserData>('/public/login', params)

// /public/loginSeller
export const sellerLogin = params => post('/public/loginSeller', params)

// /public/signupSeller
export const sellerSignup = params => post('/public/signupSeller', params)

// /public/products
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
	sold: number
}

export const getProducts = params => post<TProduct[]>('/public/products', params)

// // /api/collections
// export type TCollection = {
// 	image: string
// 	title: string
// 	description: string
// 	link: string
// }
// export const getCollections = () => get<TCollection[]>('/users/collections')

// /product/getDetails
export const getProductData = params => post<TProduct>(`/product/getDetails`, params)

// /api/updateUser
export const updateUserData = params => post('/api/updateUser', params)

// /api/updateSeller
export const updateSellerData = params => post('/api/updateSeller', params)

// /user/getInfo
export const getUserData = params => post('/user/getInfo', params)

// /seller/getInfo
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
export const getSellerData = params => post<SellerData>('/seller/getInfo', params)

// /api/uploadImage
export const uploadImages = params => upload<any>('/api/uploadImage', params)

// /api/addProduct
export const addProduct = params => post('/api/addProduct', params)

// /api/editProduct
export const editProduct = params => post('/api/editProduct', params)

// /seller/products
export const getSellerProducts = params => post<TProduct[]>('/seller/products', params)

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
	image: string
	price: number
	product_id: string
	product_name: string
	seller_id: string
	seller_name: string
	discount: number
	discount_price: number
	variations: {
		label: string
		value: string
	}[]
	quantity: number
}
export type CartResponse = {
	products: CartItem[]
	seller_name: string
	seller_id: string
}
export const checkCart = params => post<CartResponse[]>('/cart/get', params)

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

// /cart/checkout
export const checkout = params => post('/cart/checkout', params)

// /orders/get
export type OrderItem = {
	product_id: string
	order_id: number
	seller_id: string
	product_name: string
	price: number
	image: string
	discount: number
	discount_price: number
	rating: number
	description: string
	quantity: string
	variations: {
		label: string
		value: string
	}[]
	status: number
	seller_name: string
	shipped_at: number
	delivered_at: number
	completed_at: number
	created_at: number
	delivery_info: InfoItem
	group_id: string
}

export type OrderResponse = {
	address: InfoItem
	payment_method: number
	products: CartResponse[]
	time: {
		created_at: number
		completed_at: number
		shipped_at: number
		delivered_at: number
	}
	status: number
	reviewed: number
	reviewed_seller: number
}
export const getOrders = params => post<OrderItem[]>('/orders/getOrders', params)

// /orders/getOrdersByID
export const getOrdersByID = params => post<OrderResponse>('/orders/getOrdersByID', params)

// /delivery/setDefault
export const setDefault = params => post('/delivery/setDefault', params)

// /rating/add
export const addRating = params => post('/rating/add', params)

// /rating/rateSeller
export const addSellerRating = params => post('/rating/rateSeller', params)

// /rating/getReviews
export type RatingItem = {
	created_at: number
	description: string
	id: string
	images: string[]
	name: string
	rating: number
	updated_at: number
	product_name: string
}
export const getReviews = params => post<RatingItem[]>('/rating/getReviews', params)

// /rating/deleteReview
export const deleteReview = params => post('/rating/deleteReview', params)

// /public/brands
export const getBrands = () => post<SellerData[]>('/public/brands')

// /subscribe
export const subscribeNewsLetter = params => post('/subscribe', params)

// /rating/getSellerRatings
export const getSellerRatings = params => post<RatingItem[]>('/rating/getSellerRatings', params)

// /stripe/config
export const stripeConfig = () => post<string>('/stripe/config')

// /stripe/create
export const addPaymentIntent = params => post<string>('/stripe/create', params)
