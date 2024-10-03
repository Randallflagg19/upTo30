import {PostType, StateType} from './types'
import {rerenderTree} from './render'

export const state: StateType = {
	profilePage: {
		posts: [
			{id: 1, message: 'first post', likesCount: '0'},
			{id: 2, message: 'second post', likesCount: '10'},
			{id: 3, message: '3d post', likesCount: '14'},
			{id: 4, message: 'forth post', likesCount: '0'},
			{id: 5, message: 'fifth post', likesCount: '22'}],

		dialogs: [
			{id: 1, name: 'name1'},
			{id: 2, name: 'name2'},
			{id: 3, name: 'name3'},
			{id: 4, name: 'name4'},
			{id: 5, name: 'name5'},
			{id: 6, name: 'name6'}]
	},
	messagePage: {
		messages: [
			{id: 1, message: 'message1'},
			{id: 2, message: 'message2'},
			{id: 3, message: 'message3'},
			{id: 4, message: 'message4'},
			{id: 5, message: 'message5'}]
	}
}

export const addPost = (postMessage: string) => {
	debugger
	const newPost: PostType = {
		id: 6,
		message: postMessage,
		likesCount: '0'
	}

	state.profilePage.posts.push(newPost)
	rerenderTree(state)

}
