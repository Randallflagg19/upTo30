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
	},
	savePhoto: async (photoFile: File) => {
		const formData = new FormData()
		formData.append('image', photoFile)
		const res = await axiosInstance.put(`/profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return res.data.data.photos
	},
	saveProfile: async (profile: any) => {
		return await axiosInstance.put(`profile`, profile)
	}
}


