import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'

type UserAuthInfo = {
	id: number | null
	email: string | null
	login: string | null
	isAuth: boolean
}

type AuthState = {
	resultCode: number | null
	messages: string[] | null
	data: UserAuthInfo
}

const initialState: AuthState = {
	resultCode: null,
	messages: null,
	data: {
		id: null,
		email: null,
		login: null,
		isAuth: false
	}
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUserData(state, action: PayloadAction<AuthState>) {
			state.data = {...action.payload.data, isAuth: true}
		}
	}
})

export const selectIsAuth = (state: RootState) => state.auth.data.isAuth
export const selectLogin = (state: RootState) => state.auth.data.login
export const selectUserId = (state: RootState) => state.auth.data.id
export const {setAuthUserData} = authSlice.actions
export const authReducer = authSlice.reducer
