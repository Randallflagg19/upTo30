import {axiosInstance, ResultCodeForCaptcha, ResultCodesEnum} from './api'

type LoginDataType = {
	email: string,
	password: string,
	rememberMe: boolean
}

type CheckAuthResponseType = {
	data: {
		id: number
		email: string
		login: string
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}
type LoginMeResponseType = {
	data: {
		userId: number
	}
	resultCode: ResultCodesEnum | ResultCodeForCaptcha
	messages: Array<string>
}
export const authAPI = {
	checkAuth: async () => {
		const res = await axiosInstance.get<CheckAuthResponseType>(`auth/me`)
		return res.data
	},
	login: async (email: string, password: string, rememberMe: boolean = false, captcha?: string) => {
		const res = await axiosInstance.post<LoginMeResponseType>(`/auth/login`, {
			email, password, rememberMe, captcha
		})
		return res.data
	},
	logout: async () => {
		return await axiosInstance.delete(`/auth/login`)
	}
}





