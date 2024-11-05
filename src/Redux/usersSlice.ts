import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'
import {UsersPageState, UserType} from '../types'

const initialState: UsersPageState =
	{
		users: [],
		pageSize: 10,
		totalUsersCount: 0,
		currentPage: 1,
		isFetching: false
	}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		follow(state, action: PayloadAction<number>) {
			const user = state.users.find(user => user.id === action.payload)
			if (user) {
				user.followed = true
			}
		},
		unfollow(state, action: PayloadAction<number>) {
			const user = state.users.find(user => user.id === action.payload)
			if (user) {
				user.followed = false
			}
		},
		updateStatus(state, action: PayloadAction<{ userId: number; status: string | null }>) {
			const user = state.users.find(user => user.id === action.payload.userId)
			if (user) {
				user.status = action.payload.status
			}
		},
		setUsers(state, action: PayloadAction<{ users: UserType[] }>) {
			state.users = action.payload.users
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setTotalUsersCount(state, action: PayloadAction<number>) {
			state.totalUsersCount = action.payload
		},
		toggleIsFetching(state, action: PayloadAction<boolean>) {
			state.isFetching = action.payload
		}
	}
})

export const selectUsers = (state: RootState) => state.usersPage.users
export const selectIsFetching = (state: RootState) => state.usersPage.isFetching
export const selectTotalCount = (state: RootState) => state.usersPage.totalUsersCount
export const selectCurrentPage = (state: RootState) => state.usersPage.currentPage
export const selectPageSize = (state: RootState) => state.usersPage.pageSize
export const {
	follow, toggleIsFetching, unfollow, updateStatus,
	setUsers, setCurrentPage, setTotalUsersCount
} = usersSlice.actions
export const usersReducer = usersSlice.reducer