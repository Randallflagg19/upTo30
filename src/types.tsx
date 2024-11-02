export  type PostsType = Array<PostType>

export  type PostType = {
	id: number,
	message: string,
	likesCount: string
}
export  type DialogsPageState = {
	dialogs: DialogType[];
}
export  type DialogType = {
	id: number, name: string
}

export  type DialogsType = Array<DialogType>

export  type MessageType = {
	id: number
	message: string
}

export  type MessagesType = Array<MessageType>

export type StateType = {
	profilePage: {
		posts: PostsType
		newPostText: string
		dialogs: DialogsType
	}
	messagePage: {
		messages: MessagesType
		newMessageText: string
	}

}

export type StoreType = {
	state: StateType;
	rerenderTree: (state: StateType) => void;
	changeNewPostText: (newPostText: string) => void;
	subscribe: (observer: (state: StateType) => void) => void;
	changeNewMessageText: (newMessageText: string) => void;
	addPost: () => void;
	addMessage: () => void;
};
export type ObserverType = (state: StateType) => void

export type UserType = {
	name: string,
	id: number,
	photos: {
		small: string | null,
		big: string | null,
	},
	status: string | null,
	followed: boolean
}

export type UsersPageState = {
	users: Array<UserType>,
	pageSize: number,
	totalUsersCount: number,
	currentPage: number
}