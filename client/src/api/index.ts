import { post } from './http'

export const signUp = params => post('/users/signup', params)

export const login = params => post('/users/login', params)
