import {axiosInstance} from './api'

export const usersAPI = {
	getUsers: async (currentPage: number, pageSize: number) => {
		const res = await axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
		return res.data
	},
	toggleFollow: async (userId: number, method: 'post' | 'delete') => {
		const res = await axiosInstance[method](`follow/${userId}`)
		return res.data
	}
}