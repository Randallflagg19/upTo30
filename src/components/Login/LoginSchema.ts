import * as Yup from 'yup'

export const validationSchema = Yup.object({
	email: Yup.string()
		.min(2, 'Минимум 2 символа')
		.max(50, 'Максимум 50 символов')
		.required('Обязательное поле'),
	password: Yup.string()
		.min(2, 'Минимум 2 символа')
		.max(50, 'Максимум 50 символов')
		.required('Обязательное поле'),
	captcha: Yup.string().when('captchaURL', {
		is: (captchaURL: string | undefined) => !!captchaURL, // Проверяем наличие captchaURL
		then: (schema) => schema.required('Обязательное поле'), // Если есть, делаем обязательным
		otherwise: (schema) => schema.notRequired() // Если нет, делаем необязательным
	})
})