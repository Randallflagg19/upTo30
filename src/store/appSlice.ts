import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {checkAuthThunk} from './authSlice'
import {RootState} from './store'

const initialState = {
	initialized: false
}

export const initializeAppThunk =
	createAsyncThunk<void, void, { state: RootState }>(
		'app/initializeApp',
		async (_, {dispatch}) => {
			await Promise.all([
				dispatch(checkAuthThunk()).unwrap()
			])
			dispatch(setInitialized())
		}
	)

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setInitialized(state) {
			state.initialized = true
		}
	}
})

export const {setInitialized} = appSlice.actions
export const appReducer = appSlice.reducer

export const selectIsInitialized = (state: RootState): boolean => state.app.initialized
