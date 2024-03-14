import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
	darkMode: boolean
	activeLoginForm: 'seller' | 'create' | 'forgot' | 'user'
	activeSearchForm: boolean
	bannerHidden: boolean
	isLoginModalOpen: boolean
}
const initialState: InitialSlice = {
	darkMode: false,
	activeLoginForm: 'user',
	activeSearchForm: false,
	bannerHidden: false,
	isLoginModalOpen: false
}

export const BooleanSlice = createSlice({
	name: 'Boolean',
	initialState,
	reducers: {
		resetBooleanData: () => initialState,
		setDarkMode: (state, action: PayloadAction<boolean>) => ({ ...state, darkMode: !state.darkMode }),
		setActiveLoginForm: (state, action: PayloadAction<'user' | 'create' | 'forgot' | 'seller'>) => ({
			...state,
			activeLoginForm: action.payload
		}),
		setActiveSearchForm: (state, action: PayloadAction<boolean>) => ({
			...state,
			activeSearchForm: action.payload
		}),
		setIsBannerHidden: (state, action: PayloadAction<boolean>) => ({
			...state,
			bannerHidden: action.payload
		}),
		setLoginModalOpen: (state, action) => ({ ...state, isLoginModalOpen: action.payload })
	}
})

export const { setDarkMode, setActiveLoginForm, setActiveSearchForm, setIsBannerHidden, setLoginModalOpen, resetBooleanData } = BooleanSlice.actions
export default BooleanSlice.reducer
