import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
}

export const UserSlice = createSlice({
    name: 'Boolean',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
    },
})

export const { setUserData } = UserSlice.actions
export default UserSlice.reducer
