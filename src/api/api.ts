import axios from 'axios'

export const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'fc0fedd9-f046-4e76-b27c-fe00a05918eb'
	}
})





