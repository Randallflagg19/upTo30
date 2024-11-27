import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'
import {authAPI} from '../api/authAPI'
import {securityAPI} from '../api/securityAPI'

type LoginData = {
	email: string
	password: string
	rememberMe: boolean
}

type UserAuthInfo = {
	id: number | null
	email: string | null
	login: string | null
	isAuth: boolean
	captchaURL?: null | string
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
		isAuth: false,
		captchaURL: null
	},
	isAuthChecked: false
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
	async ({email, password, rememberMe, captcha}: LoginData & {
		captcha?: string
	}, {dispatch, rejectWithValue}) => {
		const response = await authAPI.login(email, password, rememberMe, captcha)
		if (response.resultCode === 0) {
			dispatch(checkAuthThunk())
		}
		else if (response.resultCode === 10) { // Ошибка капчи
			dispatch(getCaptchaURLThunk()) // Получаем URL новой капчи
			return rejectWithValue('Требуется капча')
		}
		else {
			return rejectWithValue(response.messages[0] || 'Неверный логин или пароль')
		}
	}
)

export const getCaptchaURLThunk = createAsyncThunk(
	'auth/getCaptchaURL',
	async (_, {dispatch}) => {
		const response = await securityAPI.getCaptchaURL()
		const captchaURL = response.data.url
		dispatch(setCaptchaURL(captchaURL))

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
		},
		setCaptchaURL(state, action: PayloadAction<string>) {
			state.data.captchaURL = action.payload
		}
	}
})

export const selectIsAuth = (state: RootState) => state.auth.data.isAuth
export const selectLogin = (state: RootState) => state.auth.data.login
export const selectUserId = (state: RootState) => state.auth.data.id
export const selectIsAuthChecked = (state: RootState) => state.auth.isAuthChecked
export const selectCaptchaURL = (state: RootState) => state.auth.data.captchaURL
export const {setAuthUserData, setAuthChecked, setCaptchaURL} = authSlice.actions
export const authReducer = authSlice.reducer
