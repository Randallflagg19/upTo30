import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from './store'
import {UsersPageState, UserType} from '../types'
import {usersAPI} from '../api/usersAPI'

export const followUserById = createAsyncThunk(
	'users/followUserById',
	async (userId: number, {rejectWithValue}) => {
		try {
			const response = await usersAPI.follow(userId)
			if (response.resultCode === 0) {
				return userId
			}
			else {
				return rejectWithValue('Failed to follow user')
			}
		}
		catch (error) {
			return rejectWithValue((error as Error).message)
		}
	}
)

export const getUsersThunk = createAsyncThunk(
	'users/getUsers',
	async ({currentPage, pageSize}: { currentPage: number; pageSize: number }, {dispatch}) => {
		dispatch(toggleIsFetching(true))
		const data = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(toggleIsFetching(false))
		return {users: data.items, totalCount: data.totalCount}
	}
)

export const unfollowUserById = createAsyncThunk(
	'users/unfollowUserById',
	async (userId: number, {rejectWithValue}) => {
		try {
			const response = await usersAPI.unfollow(userId)
			if (response.resultCode === 0) {
				return userId
			}
			else {
				return rejectWithValue('Failed to unfollow user')
			}
		}
		catch (error) {
			return rejectWithValue((error as Error).message)
		}
	}
)

const initialState: UsersPageState =
	{
		users: [],
		pageSize: 10,
		totalUsersCount: 0,
		currentPage: 1,
		isFetching: false,
		followingInProgress: [],
		status: null,
		error: null
	}
const usersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getUsersThunk.fulfilled, (state, action) => {
				state.users = action.payload.users
				state.totalUsersCount = action.payload.totalCount
			})
			.addCase(followUserById.pending, (state, action) => {
				state.followingInProgress.push(action.meta.arg)
			})
			.addCase(followUserById.fulfilled, (state, action) => {
				const user = state.users.find((user) => user.id === action.payload)
				if (user) {
					user.followed = true
				}
				state.followingInProgress = state.followingInProgress.filter((id) => id !== action.payload)
			})
			.addCase(followUserById.rejected, (state, action) => {
				state.error = action.error.message || 'Error following user'
				state.followingInProgress = state.followingInProgress.filter((id) => id !== action.meta.arg)
			})
			.addCase(unfollowUserById.pending, (state, action) => {
				state.followingInProgress.push(action.meta.arg)
			})
			.addCase(unfollowUserById.fulfilled, (state, action) => {
				const user = state.users.find((user) => user.id === action.payload)
				if (user) {
					user.followed = false
				}
				state.followingInProgress = state.followingInProgress.filter((id) => id !== action.payload)
			})
			.addCase(unfollowUserById.rejected, (state, action) => {
				state.error = action.error.message || 'Error unfollowing user'
				state.followingInProgress = state.followingInProgress.filter((id) => id !== action.meta.arg)
			})
	},
	reducers: {
		follow(state, action: PayloadAction<number>) {
			const user = state.users.find(user => user.id === action.payload)
			if (user) {
				usersAPI.follow(user.id)
					.then((response) => {
						if (response.resultCount === 0) {
							user.followed = true
						}
					})
			}
		},
		unfollow(state, action: PayloadAction<number>) {
			const user = state.users.find(user => user.id === action.payload)
			if (user) {
				usersAPI.unfollow(user.id)
					.then((response) => {
						if (response.resultCount === 0) {
							user.followed = false
						}
					})
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
		},
		toggleFollowingInProgress(state, action: PayloadAction<[boolean, number]>) {
			const [isFetching, id] = action.payload
			if (isFetching) {
				state.followingInProgress.push(id)
			}
			else {
				state.followingInProgress = state.followingInProgress.filter(userId => userId !== id)
			}
		}

	}
})

export const selectUsers = (state: RootState) => state.usersPage.users
export const selectFollowingInProgress = (state: RootState) => state.usersPage.followingInProgress
export const selectIsFetching = (state: RootState) => state.usersPage.isFetching
export const selectTotalCount = (state: RootState) => state.usersPage.totalUsersCount
export const selectCurrentPage = (state: RootState) => state.usersPage.currentPage
export const selectPageSize = (state: RootState) => state.usersPage.pageSize
export const {
	follow, toggleIsFetching, unfollow, updateStatus,
	setUsers, setCurrentPage, setTotalUsersCount
} = usersSlice.actions
export const usersReducer = usersSlice.reducer