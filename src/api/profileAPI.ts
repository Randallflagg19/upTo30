import {axiosInstance} from './api'

export const profileAPI = {
	getUserProfile: async (userId: string) => {
		const res = await axiosInstance.get(`profile/${userId}`)
		return res.data
	}
}


