import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
    activeLoginModal: boolean
    activeLoginForm: 'login' | 'create' | 'forgot'
    activeSearchForm: boolean
}
const initialState: InitialSlice = {
    activeLoginModal: false,
    activeLoginForm: 'login',
    activeSearchForm: false,
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
        setActiveSearchForm: (state, action: PayloadAction<boolean>) => {
            state.activeSearchForm = action.payload
        },
    },
})

export const { setActiveLoginModal, setActiveLoginForm, setActiveSearchForm } = BooleanSlice.actions
export default BooleanSlice.reducer
