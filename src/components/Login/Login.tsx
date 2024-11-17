import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {Input, Checkbox, Button} from 'antd'
import {loginThunk, selectIsAuth, selectIsAuthChecked} from '../../store/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../store/store'
import {Navigate} from 'react-router-dom'

const validationSchema = Yup.object({
	email: Yup.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов').required('Обязательное поле'),
	password: Yup.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов').required('Обязательное поле')
})

const LoginForm = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [errorMessage, setErrorMessage] = useState<string | null>(null) // Локальное состояние ошибки

	return (
		<Formik
			initialValues={{email: '', password: '', rememberMe: false}}
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
							{({field}: any) => (
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
							{({field}: any) => (
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
							{({field}: any) => <Checkbox {...field}>Remember me</Checkbox>}
						</Field>
					</div>

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

const Login = () => {
	const isAuth = useSelector(selectIsAuth)
	const isAuthChecked = useSelector(selectIsAuthChecked)

	// Пока не проверили авторизацию, не рендерим страницу
	if (!isAuthChecked) {
		return null
	}

	// Если пользователь авторизован, редиректим его
	if (isAuth) {
		return <Navigate to="/sn/profile"/>
	}

	// Если пользователь не авторизован, рендерим страницу логина
	return (
		<div
			style={{maxWidth: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px'}}
		>
			<h1>Login</h1>
			<LoginForm/>
		</div>
	)
}

export default Login
