import * as Yup from 'yup'

export const validationSchema = Yup.object({
	fullName: Yup.string().required('Full name is required'),
	lookingForAJob: Yup.boolean(),
	lookingForAJobDescription: Yup.string().when('lookingForAJob', (lookingForAJob, schema) =>
		lookingForAJob ? schema.required('Please provide your professional skills') : schema
	),
	aboutMe: Yup.string().required('Please tell us about yourself'),
	contacts: Yup.object().shape({
		facebook: Yup.string().url('Invalid URL for Facebook').nullable(),
		website: Yup.string().url('Invalid URL for Website').nullable(),
		vk: Yup.string().url('Invalid URL for VK').nullable(),
		twitter: Yup.string().url('Invalid URL for Twitter').nullable(),
		instagram: Yup.string().url('Invalid URL for Instagram').nullable(),
		youtube: Yup.string().url('Invalid URL for YouTube').nullable(),
		github: Yup.string().url('Invalid URL for GitHub').nullable(),
		mainLink: Yup.string().url('Invalid URL for Main Link').nullable()
	}).nullable() // This makes the entire 'contacts' object optional
})