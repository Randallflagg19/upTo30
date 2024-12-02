import axios from 'axios'

export enum ResultCodesEnum {
	Success = 0,
	Error = 1
}

export enum ResultCodeForCaptcha {
	CaptchaIsRequired = 10
}

export const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'fc0fedd9-f046-4e76-b27c-fe00a05918eb'
	}
})





