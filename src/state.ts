import {MessageType, PostType, StateType} from './types'

let rerenderTree = (state: StateType) => {
	console.log('state changed')
}

export const state: StateType = {
	profilePage: {
		posts: [
			{id: 1, message: 'first post', likesCount: '0'},
			{id: 2, message: 'second post', likesCount: '10'},
			{id: 3, message: '3d post', likesCount: '14'},
			{id: 4, message: 'forth post', likesCount: '0'},
			{id: 5, message: 'fifth post', likesCount: '22'}],
		newPostText: '',
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
			{id: 5, message: 'message5'}],
		newMessageText: ''
	}
}

export const addPost = () => {
	const newPost: PostType = {
		id: state.profilePage.posts.length + 1,
		message: state.profilePage.newPostText,
		likesCount: '0'
	}
	state.profilePage.posts.push(newPost)
	state.profilePage.newPostText = ''
	rerenderTree(state)
}

export const changeNewPostText = (newPostText: string) => {
	state.profilePage.newPostText = newPostText
	rerenderTree(state)
}

export const subscribe = (observer: (state: StateType) => void) => {
	rerenderTree = observer
}

export const addMessage = () => {
	const newMessage: MessageType = {
		id: 6,
		message: state.messagePage.newMessageText
	}
	state.messagePage.messages.push(newMessage)
	state.messagePage.newMessageText = ''
	rerenderTree(state)
}

export const changeNewMessageText = (newMessageText: string) => {
	state.messagePage.newMessageText = newMessageText
	rerenderTree(state)
}

// @ts-ignore
window.state = state