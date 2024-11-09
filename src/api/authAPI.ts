import {axiosInstance} from './api'

export const authAPI = {
	checkAuth: async () => {
		const res = await axiosInstance.get(`auth/me`)
		return res.data
	}
}