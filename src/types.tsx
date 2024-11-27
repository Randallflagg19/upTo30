export  type PostType = {
	id: number,
	message: string,
	likesCount: string
}

export  type DialogType = {
	id: number, name: string
}

export  type MessageType = {
	id: number
	message: string
}

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
	currentPage: number,
	isFetching: boolean,
	followingInProgress: number[]
	status: null | string,
	error: null | string,
}

export type ContactsType = {
	facebook?: string;
	website?: string;
	vk?: string;
	twitter?: string;
	instagram?: string;
	youtube?: string;
	github?: string;
	mainLink?: string;
}

export type ProfileType = {
	userId: number,
	lookingForAJob: boolean,
	lookingForAJobDescription: string,
	fullName: string,
	contacts: ContactsType
	photos: {
		small: string | null,
		large: string | null,
	},
	aboutMe: string
}

