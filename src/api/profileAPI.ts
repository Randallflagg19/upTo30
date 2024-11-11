import {axiosInstance} from './api'

export const profileAPI = {
	getUserProfile: async (userId: string) => {
		const res = await axiosInstance.get(`profile/${userId}`)
		return res.data
	},
	getUserStatus: async (userId: string) => {
		return await axiosInstance.get(`profile/status/${userId}`)
	},
	updateUserStatus: async (status: string) => {
		return await axiosInstance.put(`profile/status`, {status: status})
	}
}


