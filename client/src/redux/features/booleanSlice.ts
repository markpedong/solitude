import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
    activeLoginForm: 'login' | 'create' | 'forgot'
    activeSearchForm: boolean
}
const initialState: InitialSlice = {
    activeLoginForm: 'login',
    activeSearchForm: false,
}

export const BooleanSlice = createSlice({
    name: 'Boolean',
    initialState,
    reducers: {
        setActiveLoginForm: (state, action: PayloadAction<'login' | 'create' | 'forgot'>) => {
            state.activeLoginForm = action.payload
        },
        setActiveSearchForm: (state, action: PayloadAction<boolean>) => {
            state.activeSearchForm = action.payload
        },
    },
})

export const { setActiveLoginForm, setActiveSearchForm } = BooleanSlice.actions
export default BooleanSlice.reducer
