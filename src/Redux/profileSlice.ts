import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PostType} from './../types'
import {RootState} from './store'
import {profileAPI} from '../api/profileAPI'

type ProfilePageState = {
	posts: PostType[];
	newPostText: string;
	profile: null | any
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
	profile: null
}

export const getUserProfileThunk = createAsyncThunk<any, string, { state: RootState }>(
	'profile/getUserProfile',
	async (userId: string, {dispatch}) => {
		const data = await profileAPI.getUserProfile(userId)
		dispatch(setUserProfile(data))
		return data
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
	},
	reducers: {
		changeNewPostText(state, action: PayloadAction<string>) {
			state.newPostText = action.payload
		},
		addPost(state) {
			const newPost: PostType = {
				id: state.posts.length + 1,
				message: state.newPostText,
				likesCount: '0'
			}
			state.posts = [...state.posts, newPost]
			state.newPostText = ''
		},
		setUserProfile(state, action: PayloadAction<any>) {
			state.profile = action.payload
		}
	}
})

export const selectPosts = (state: RootState) => state.profilePage.posts
export const selectNewPostText = (state: RootState) => state.profilePage.newPostText
export const {changeNewPostText, addPost, setUserProfile} = profileSlice.actions
export const profileReducer = profileSlice.reducer
export const selectProfile = (state: RootState) => state.profilePage.profile
