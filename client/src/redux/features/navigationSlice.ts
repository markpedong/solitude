import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialSlice = {
    selected: string
}
const initialState: InitialSlice = {
    selected: '',
}

export const Navigation = createSlice({
    name: 'Navigation',
    initialState,
    reducers: {
        setNavigationMenu: (state, action: PayloadAction<string>) => {
            state.selected = action.payload
        },
    },
})

export const { setNavigationMenu } = Navigation.actions
export default Navigation.reducer
