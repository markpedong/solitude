import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import booleanReducer from './features/booleanSlice'
import userReducer from './features/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, createTransform } from 'redux-persist'
import { compress, decompress } from 'lz-string'

type RootType = {
    boolean: ReturnType<typeof booleanReducer>
    userData: ReturnType<typeof userReducer>
}

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    transforms: [
        createTransform(
            i => compress(JSON.stringify(i)),
            o => JSON.parse(decompress(o))
        ),
    ],
}

const reducer = combineReducers({
    boolean: booleanReducer,
    userData: userReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector
