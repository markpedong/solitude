import { CartItem } from '@/api'
import { createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
	userData: {
		id: string
		created_at: string
		updated_at: string
		address_details: []
		orders: { id: string }[]
		password: string
		email: string
		first_name: string
		birthday: string
		username: string
		userCart: CartItem[]
	}
	sellerData: {
		seller_id: string
		created_at: string
		seller_name: string
		password: string
		email: string
		username: string
		location: string
	}
	type: number
	token: string
	isLoggedIn: boolean
}
const initialState: InitialSlice = {
	userData: {
		id: '',
		created_at: '',
		updated_at: '',
		address_details: [],
		orders: [],
		password: '',
		email: '',
		first_name: '',
		birthday: '',
		username: '',
		userCart: []
	},
	sellerData: {
		created_at: '',
		email: '',
		location: '',
		password: '',
		seller_id: '',
		seller_name: '',
		username: ''
	},
	type: 0,
	token: '',
	isLoggedIn: false
}

export const UserSlice = createSlice({
	name: 'Boolean',
	initialState,
	reducers: {
		resetUserData: () => initialState,
		setType: (state, action) => ({ ...state, type: action.payload }),
		setUserData: (state, action) => ({ ...state, isLoggedIn: true, userData: action.payload }),
		setSellerData: (state, action) => ({ ...state, isLoggedIn: true, sellerData: action.payload }),
		setUserToken: (state, action) => ({ ...state, token: action.payload }),
		setUserCart: (state, action) => ({ ...state, userData: { ...state.userData, user_cart: action.payload } }),
		setCart: (state, action) => ({ ...state, userData: { ...state.userData, userCart: action.payload } })
	}
})

export const { setUserData, resetUserData, setUserToken, setSellerData, setType, setUserCart, setCart } = UserSlice.actions
export default UserSlice.reducer
