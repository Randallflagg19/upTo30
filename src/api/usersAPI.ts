import {axiosInstance} from './api'

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