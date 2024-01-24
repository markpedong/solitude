import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import booleanSlice from './features/booleanSlice'
import userSlice from './features/userSlice'

type RootType = {
    boolean: ReturnType<typeof booleanSlice>
    userData: ReturnType<typeof userSlice>
}

const reducer = combineReducers({
    boolean: booleanSlice,
    userData: userSlice
})

export const store = configureStore({
    reducer,
    // middleware: getDefaultMiddleware => {
    //     return getDefaultMiddleware({
    //         serializableCheck: {
    //             warnAfter: 128,
    //         },
    //         immutableCheck: { warnAfter: 128 },
    //     })
    // },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector
