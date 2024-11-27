import {axiosInstance} from './api'

type LoginDataType = {
	email: string,
	password: string,
	rememberMe: boolean
}

export const authAPI = {
	checkAuth: async () => {
		const res = await axiosInstance.get(`auth/me`)
		return res.data
	},
	login: async (email: string, password: string, rememberMe: boolean = false, captcha?: string) => {
		const res = await axiosInstance.post(`/auth/login`, {
			email, password, rememberMe, captcha
		})
		return res.data
	},
	logout: async () => {
		return await axiosInstance.delete(`/auth/login`)
	}
}

