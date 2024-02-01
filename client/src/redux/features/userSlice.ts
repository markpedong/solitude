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
    token: '',
    isLoggedIn: false,
}

export const UserSlice = createSlice({
    name: 'Boolean',
    initialState,
    reducers: {
        resetUserData: () => initialState,
        setUserData: (state, action) => ({ ...state, isLoggedIn: true, userData: action.payload }),
        setUserToken: (state, action) => ({ ...state, token: action.payload }),
    },
})

export const { setUserData, resetUserData, setUserToken } = UserSlice.actions
export default UserSlice.reducer
