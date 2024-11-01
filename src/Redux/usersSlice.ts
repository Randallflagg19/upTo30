import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'
import {UsersPageState, UserType} from '../types'

const initialState: UsersPageState =
	{
		users: []
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
		}
	}
})

export const selectUsers = (state: RootState) => state.usersPage.users
export const {follow, unfollow, updateStatus, setUsers} = usersSlice.actions
export const usersReducer = usersSlice.reducer