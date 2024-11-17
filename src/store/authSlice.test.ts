import {authReducer, setAuthUserData, setAuthChecked} from './authSlice'

describe('authSlice reducers', () => {
	const initialState = {
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

	it('should handle setAuthUserData', () => {
		const action = setAuthUserData({
			data: {id: 1, email: 'test@test.com', login: 'TestUser', isAuth: true},
			isAuth: true
		})
		const newState = authReducer(initialState, action)
		expect(newState.data).toEqual({
			id: 1,
			email: 'test@test.com',
			login: 'TestUser',
			isAuth: true
		})
	})

	it('should handle setAuthChecked', () => {
		const action = setAuthChecked(true)
		const newState = authReducer(initialState, action)
		expect(newState.isAuthChecked).toBe(true)
	})
})
