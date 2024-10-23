import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PostType} from './../types'
import {RootState} from './store'

type ProfilePageState = {
	posts: PostType[];
	newPostText: string;
}

const initialState: ProfilePageState = {
	posts: [
		{id: 1, message: 'first post', likesCount: '0'},
		{id: 2, message: 'second post', likesCount: '10'},
		{id: 3, message: '3d post', likesCount: '14'},
		{id: 4, message: 'forth post', likesCount: '0'},
		{id: 5, message: 'fifth post', likesCount: '22'}
	],
	newPostText: ''
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
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
			state.posts.push(newPost)
			state.newPostText = ''
		}
	}
})

export const selectPosts = (state: RootState) => state.profilePage.posts
export const selectNewPostText = (state: RootState) => state.profilePage.newPostText
export const {changeNewPostText, addPost} = profileSlice.actions
export const profileReducer = profileSlice.reducer
