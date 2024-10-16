import {MessageType, ObserverType, PostType, StoreType} from './types'

export const store: StoreType = {
	state: {
		profilePage: {
			posts: [
				{id: 1, message: 'first post', likesCount: '0'},
				{id: 2, message: 'second post', likesCount: '10'},
				{id: 3, message: '3d post', likesCount: '14'},
				{id: 4, message: 'forth post', likesCount: '0'},
				{id: 5, message: 'fifth post', likesCount: '22'}
			],
			newPostText: '',
			dialogs: [
				{id: 1, name: 'name1'},
				{id: 2, name: 'name2'},
				{id: 3, name: 'name3'},
				{id: 4, name: 'name4'},
				{id: 5, name: 'name5'},
				{id: 6, name: 'name6'}
			]
		},
		messagePage: {
			messages: [
				{id: 1, message: 'message1'},
				{id: 2, message: 'message2'},
				{id: 3, message: 'message3'},
				{id: 4, message: 'message4'},
				{id: 5, message: 'message5'}
			],
			newMessageText: ''
		}
	},

	changeNewPostText: (newPostText: string) => {
		store.state.profilePage.newPostText = newPostText
		store.rerenderTree(store.state)
	},
	addPost: () => {
		const newPost: PostType = {
			id: store.state.profilePage.posts.length + 1,
			message: store.state.profilePage.newPostText,
			likesCount: '0'
		}
		store.state.profilePage.posts.push(newPost)
		store.state.profilePage.newPostText = ''
		store.rerenderTree(store.state)
	},
	changeNewMessageText: (newMessageText: string) => {
		store.state.messagePage.newMessageText = newMessageText
		store.rerenderTree(store.state)
	},
	addMessage: () => {
		const newMessage: MessageType = {
			id: store.state.messagePage.messages.length + 1,
			message: store.state.messagePage.newMessageText
		}
		store.state.messagePage.messages.push(newMessage)
		store.state.messagePage.newMessageText = ''
		store.rerenderTree(store.state)
	},
	subscribe: (observer: ObserverType) => {
		store.rerenderTree = observer
	},
	rerenderTree: () => {
		console.log('state changed')
	}
}
