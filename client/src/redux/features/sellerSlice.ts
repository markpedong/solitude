import { createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
    sellerData: {
        seller_id: string
        created_at: string
        seller_name: string
        password: string
        email: string
        username: string
        location: string
    }
    token: string
    isLoggedIn: boolean
}
const initialState: InitialSlice = {
    sellerData: {
        seller_id: '',
        created_at: '',
        password: '',
        email: '',
        username: '',
        location: '',
        seller_name: '',
    },
    token: '',
    isLoggedIn: false,
}

export const SellerSlice = createSlice({
    name: 'Seller',
    initialState,
    reducers: {
        resetSellerData: () => initialState,
        setSellerData: (state, action) => ({ ...state, isLoggedIn: true, userData: action.payload }),
        setSellerToken: (state, action) => ({ ...state, token: action.payload }),
    },
})

export const { setSellerData, resetSellerData, setSellerToken } = SellerSlice.actions
export default SellerSlice.reducer
