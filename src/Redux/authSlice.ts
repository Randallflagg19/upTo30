import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'

type UserAuthInfo = {
	userId: number | null
	email: string | null
	login: string | null,
	isAuth: boolean,
}

type AuthState = {
	resultCode: number | null
	messages: string[] | null
	data: UserAuthInfo | null
}

const initialState: UserAuthInfo = {
	userId: null,
	email: null,
	login: null,
	isAuth: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUserData(state: UserAuthInfo, action: PayloadAction<AuthState>) {
			return {...state, ...action.payload.data, isAuth: true}
		}
	}
})

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectLogin = (state: RootState) => state.auth.login
export const {setAuthUserData} = authSlice.actions
export const authReducer = authSlice.reducer

// export const selectDialogs = (state: RootState) => state.dialogsPage.dialogs

// const initialState: AuthState = {
// 	resultCode: null,
// 	messages: null,
// 	data: null
// }
