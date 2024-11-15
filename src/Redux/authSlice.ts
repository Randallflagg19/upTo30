import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'
import {authAPI} from '../api/authAPI'

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
	isAuthChecked: boolean
}

const initialState: AuthState = {
	resultCode: null,
	messages: null,
	data: {
		id: null,
		email: null,
		login: null,
		isAuth: false
	},
	isAuthChecked: false
}
type LoginData = {
	email: string;
	password: string;
	rememberMe: boolean
}
export const checkAuthThunk = createAsyncThunk(
	'auth/checkAuth',
	async (_, {dispatch}) => {
		const response = await authAPI.checkAuth()
		if (response.resultCode === 0) {
			dispatch(setAuthUserData({data: response.data, isAuth: true}))
		}
		dispatch(setAuthChecked(true))
	}
)
export const loginThunk = createAsyncThunk(
	'auth/login',
	async ({email, password, rememberMe}: LoginData
		, {dispatch, rejectWithValue}) => {
		const response = await authAPI.login(email, password, rememberMe)
		if (response.resultCode === 0) {
			dispatch(checkAuthThunk())
		}
		else {
			return rejectWithValue(response.messages[0] || 'Неверный логин или пароль')
		}
	}
)

export const logoutThunk = createAsyncThunk(
	'auth/logout',
	async (_, {dispatch}) => {
		const response = await authAPI.logout()
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData({
				data: {id: null, email: null, login: null, isAuth: false},
				isAuth: false
			}))
		}
	}
)
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUserData(state, action: PayloadAction<{ data: UserAuthInfo; isAuth: boolean }>) {
			state.data = {...action.payload.data, isAuth: action.payload.isAuth}
		},
		setAuthChecked(state, action: PayloadAction<boolean>) {
			state.isAuthChecked = action.payload
		}
	}
})

export const selectIsAuth = (state: RootState) => state.auth.data.isAuth
export const selectLogin = (state: RootState) => state.auth.data.login
export const selectUserId = (state: RootState) => state.auth.data.id
export const selectIsAuthChecked = (state: RootState) => state.auth.isAuthChecked
export const {setAuthUserData, setAuthChecked} = authSlice.actions
export const authReducer = authSlice.reducer
