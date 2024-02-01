import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
    darkMode: boolean
    activeLoginForm: 'login' | 'create' | 'forgot' | 'seller'
    activeSearchForm: boolean
}
const initialState: InitialSlice = {
    darkMode: false,
    activeLoginForm: 'login',
    activeSearchForm: false,
}

export const BooleanSlice = createSlice({
    name: 'Boolean',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => ({ ...state, darkMode: !state.darkMode }),
        setActiveLoginForm: (state, action: PayloadAction<'login' | 'create' | 'forgot' | 'seller'>) => ({
            ...state,
            activeLoginForm: action.payload,
        }),
        setActiveSearchForm: (state, action: PayloadAction<boolean>) => ({
            ...state,
            activeSearchForm: action.payload,
        }),
    },
})

export const { setDarkMode, setActiveLoginForm, setActiveSearchForm } = BooleanSlice.actions
export default BooleanSlice.reducer
