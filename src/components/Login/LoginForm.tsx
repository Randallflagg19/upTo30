import React, {useState} from 'react'
import {ErrorMessage, Field, FieldInputProps, Form, Formik} from 'formik'
import {Button, Checkbox, Input} from 'antd'
import {loginThunk, selectCaptchaURL} from '../../store/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../store/store'
import {validationSchema} from './LoginSchema'

export const LoginForm = () => {
	const dispatch = useDispatch<AppDispatch>()
	const captchaURL = useSelector(selectCaptchaURL)
	const [errorMessage, setErrorMessage] = useState<string | null>(null) // Локальное состояние ошибки

	return (
		<Formik
			initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
			validationSchema={validationSchema}
			onSubmit={async (values, {setSubmitting}) => {
				try {
					await dispatch(loginThunk(values)).unwrap() // unwrap позволяет выбросить ошибку
					setErrorMessage(null) // Сбрасываем ошибку при успешном логине
				}
				catch (error) {
					setErrorMessage(error as string) // Устанавливаем сообщение об ошибке
				} finally {
					setSubmitting(false)
				}
			}}
		>
			{({errors, touched, isSubmitting}) => (
				<Form style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
					<div>
						<Field name="email">
							{({field}: { field: FieldInputProps<string> }) => (
								<Input
									{...field}
									placeholder="Email"
									status={errors.email && touched.email ? 'error' : ''}
								/>
							)}
						</Field>
						<ErrorMessage name="email">
							{(msg) => <div style={{color: 'red'}}>{msg}</div>}
						</ErrorMessage>
					</div>

					<div>
						<Field name="password">
							{({field}: { field: FieldInputProps<string> }) => (
								<Input.Password
									{...field}
									placeholder="Password"
									status={errors.password && touched.password ? 'error' : ''}
								/>
							)}
						</Field>
						<ErrorMessage name="password">
							{(msg) => <div style={{color: 'red'}}>{msg}</div>}
						</ErrorMessage>
					</div>

					<div>
						<Field name="rememberMe" type="checkbox">
							{({field}: { field: FieldInputProps<string> }) => <Checkbox {...field}>Remember
								me</Checkbox>}
						</Field>
					</div>

					{/* Отображение капчи */}
					{captchaURL && (
						<div>
							<div style={{marginBottom: '10px'}}>
								<img src={captchaURL} alt="Captcha"/>
							</div>
							<Field name="captcha">
								{({field}: { field: FieldInputProps<string> }) => (
									<Input
										{...field}
										placeholder="Введите капчу"
										status={errors.captcha && touched.captcha ? 'error' : ''}
									/>
								)}
							</Field>
							<ErrorMessage name="captcha">
								{(msg) => <div style={{color: 'red'}}>{msg}</div>}
							</ErrorMessage>
						</div>
					)}

					{/* Отображение ошибки */}
					{errorMessage && <div style={{color: 'red', marginBottom: '10px'}}>{errorMessage}</div>}

					<Button type="primary" htmlType="submit" loading={isSubmitting}>
						Login
					</Button>
				</Form>
			)}
		</Formik>
	)
}
