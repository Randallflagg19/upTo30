import {axiosInstance} from './api'

export const securityAPI = {
	getCaptchaURL: async () => {
		return await axiosInstance.get(`security/get-captcha-url`)
	}
}

