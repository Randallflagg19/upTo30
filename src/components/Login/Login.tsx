import React from 'react'
import {Formik, Form, Field} from 'formik'

const LoginForm = () => {
	return (
		<Formik
			initialValues={{username: '', password: '', rememberMe: false}}
			onSubmit={(values) => {
				console.log('Form data:', values)
			}}
		>
			{() => (
				<Form>
					<div>
						<Field type="text" name="username" placeholder="Username"/>
					</div>
					<div>
						<Field type="password" name="password" placeholder="Password"/>
					</div>
					<div>
						<label>
							<Field type="checkbox" name="rememberMe"/>
							Remember me
						</label>
					</div>
					<div>
						<button type="submit">Login</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

const Login = () => {
	return (
		<>
			<h1>Login</h1>
			<LoginForm/>
		</>
	)
}

export default Login
