import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PostType, ProfileType} from '../types'
import {RootState} from './store'
import {profileAPI} from '../api/profileAPI'

type ProfilePageState = {
	posts: PostType[]
	newPostText: string
	profile: null | ProfileType
	status: string;
}

const initialState: ProfilePageState = {
	posts: [
		{id: 1, message: 'first post', likesCount: '0'},
		{id: 2, message: 'second post', likesCount: '10'},
		{id: 3, message: '3d post', likesCount: '14'},
		{id: 4, message: 'forth post', likesCount: '0'},
		{id: 5, message: 'fifth post', likesCount: '22'}
	],
	newPostText: '',
	profile: null,
	status: ''
}

export const getUserProfileThunk = createAsyncThunk<ProfileType, string, { state: RootState }>(
	'profile/getUserProfile',
	async (userId: string, {dispatch}) => {
		const data = await profileAPI.getUserProfile(userId)
		dispatch(setUserProfile(data))
		return data
	}
)

export const getStatusThunk = createAsyncThunk<string, string, { state: RootState }>(
	'profile/getStatus',
	async (userId) => {
		const response = await profileAPI.getUserStatus(userId)
		return response.data
	}
)
///////
export const updateStatusThunk = createAsyncThunk<void, string, { state: RootState }>(
	'profile/updateStatus',
	async (status, {dispatch}) => {
		await profileAPI.updateUserStatus(status)
		dispatch(setStatus(status))
	}
)
/////////

export const savePhotoThunk = createAsyncThunk<{ small: string; large: string }, File, {
	state: RootState
}>(
	'profile/savePhoto',
	async (photoFile) => {
		return await profileAPI.savePhoto(photoFile)
	}
)

export const saveProfileDescriptionThunk = createAsyncThunk<
	void, // тип возвращаемого значения
	ProfileType, // тип передаваемого параметра
	{ state: RootState } // типы аргументов для контекста
>(
	'profile/saveProfileDescription',
	async (profileData, {dispatch, rejectWithValue}) => {
		try {
			// Отправка данных профиля на сервер
			await profileAPI.saveProfile(profileData)

			// Обновление данных профиля в состоянии
			dispatch(setUserProfile(profileData))
		}
		catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Failed to save profile:', error.message)
				// В случае ошибки возвращаем её для обработки в компоненте
				return rejectWithValue(error.message)
			}
			else {
				console.error('An unknown error occurred')
				return rejectWithValue('An unknown error occurred')
			}
		}
	}
)

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getUserProfileThunk.fulfilled, (state, action) => {
				state.profile = action.payload
			})
			.addCase(getStatusThunk.fulfilled, (state, action) => {
				state.status = action.payload
			})
			.addCase(updateStatusThunk.fulfilled, (state, action) => {
				state.status = action.meta.arg
			})
			.addCase(savePhotoThunk.fulfilled, (state, action) => {
				if (state.profile) {
					state.profile.photos = action.payload

				}
			})
	},
	reducers: {
		addPost(state, action: PayloadAction<string>) {
			const newPost: PostType = {
				id: state.posts.length + 1,
				message: action.payload,
				likesCount: '0'
			}
			state.posts = [...state.posts, newPost]
			state.newPostText = ''
		},
		setUserProfile(state, action: PayloadAction<ProfileType>) {
			state.profile = action.payload
		},
		setStatus(state, action: PayloadAction<string>) {
			state.status = action.payload
		}
	}
})

export const selectStatus = (state: RootState) => state.profilePage.status
export const selectPosts = (state: RootState) => state.profilePage.posts
export const {addPost, setUserProfile, setStatus} = profileSlice.actions
export const profileReducer = profileSlice.reducer
export const selectProfile = (state: RootState) => state.profilePage.profile
