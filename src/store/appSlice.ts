import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {checkAuthThunk} from './authSlice'
import {RootState} from './store'

const initialState = {
	initialized: false
}

// Thunk для инициализации приложения
export const initializeAppThunk = createAsyncThunk(
	'app/initializeApp',
	async (_, {dispatch}) => {
		// Дожидаемся выполнения всех промисов
		await Promise.all([
			dispatch(checkAuthThunk()).unwrap()
		])
		dispatch(setInitialized())
	}
)

// Срез для управления состоянием инициализации
const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setInitialized(state) {
			state.initialized = true // Обновляем значение напрямую
		}
	}
})

// Экспорт действий и редюсера
export const {setInitialized} = appSlice.actions
export const appReducer = appSlice.reducer

// Селектор состояния инициализации
export const selectIsInitialized = (state: RootState) => state.app.initialized
