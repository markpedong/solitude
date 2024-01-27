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
    },
    token: '',
    isLoggedIn: false,
}

export const UserSlice = createSlice({
    name: 'Boolean',
    initialState,
    reducers: {
        resetUserData: state => {
            state = initialState
            window.location.reload()
            window.location.replace('/')
            localStorage.clear()
        },
        setUserData: (state, action) => {
            state.userData = action.payload
            state.isLoggedIn = true
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    },
})

export const { setUserData, resetUserData, setToken } = UserSlice.actions
export default UserSlice.reducer
