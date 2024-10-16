export  type PostsType = Array<PostType>

export  type PostType = {
	id: number,
	message: string,
	likesCount: string
}

export  type Dialog = {
	id: number, name: string
}

export  type DialogsType = Array<Dialog>

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