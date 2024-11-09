import axios from 'axios'

export const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'fc0fedd9-f046-4e76-b27c-fe00a05918eb'
	}
})

export const usersAPI = {
	getUsers: async (currentPage: number, pageSize: number) => {
		const res = await axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
		return res.data
	},
	follow: async (userId: number) => {
		const res = await axiosInstance.post(`follow/${userId}`)
		return res.data
	},
	unfollow: async (userId: number) => {
		const res = await axiosInstance.delete(`follow/${userId}`)
		return res.data
	}
}

export const getUserProfile = async (userId: string) => {
	const res = await axiosInstance.get(`profile/${userId}`)
	return res.data
}

export const checkAuth = async () => {
	const res = await axiosInstance.get(`auth/me`)
	return res.data
}

