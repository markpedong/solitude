import { createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
    userData: {
        id: string
        created_at: string
        updated_at: string
        user_cart: []
        address_details: []
        orders: []
        password: string
        email: string
        first_name: string
        birthday: string
        username: string
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
    type: string
    token: string
    isLoggedIn: boolean
}
const initialState: InitialSlice = {
    userData: {
        id: '',
        created_at: '',
        updated_at: '',
        user_cart: [],
        address_details: [],
        orders: [],
        password: '',
        email: '',
        first_name: '',
        birthday: '',
        username: '',
    },
    sellerData: {
        created_at: '',
        email: '',
        location: '',
        password: '',
        seller_id: '',
        seller_name: '',
        username: '',
    },
    type: '',
    token: '',
    isLoggedIn: false,
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
    },
})

export const { setUserData, resetUserData, setUserToken, setSellerData, setType } = UserSlice.actions
export default UserSlice.reducer
