import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
    activeLoginModal: boolean
}
const initialState: InitialSlice = {
    activeLoginModal: false,
}

export const BooleanSlice = createSlice({
    name: 'Boolean',
    initialState,
    reducers: {
        setActiveLoginModal: (state, action: PayloadAction<boolean>) => {
            state.activeLoginModal = action.payload
        },
    },
})

export const { setActiveLoginModal } = BooleanSlice.actions
export default BooleanSlice.reducer
