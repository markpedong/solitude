import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
    activeLoginModal: boolean
    activeLoginForm: 'login' | 'create' | 'forgot'
}
const initialState: InitialSlice = {
    activeLoginModal: false,
    activeLoginForm: 'login',
}

export const BooleanSlice = createSlice({
    name: 'Boolean',
    initialState,
    reducers: {
        setActiveLoginModal: (state, action: PayloadAction<boolean>) => {
            state.activeLoginModal = action.payload
        },
        setActiveLoginForm: (state, action: PayloadAction<'login' | 'create' | 'forgot'>) => {
            state.activeLoginForm = action.payload
        },
    },
})

export const { setActiveLoginModal, setActiveLoginForm } = BooleanSlice.actions
export default BooleanSlice.reducer
