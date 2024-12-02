import React from 'react'
import {selectIsAuth, selectIsAuthChecked} from '../../store/authSlice'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {LoginForm} from './LoginForm'
import styles from './Login.module.css'

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
		<div className={styles.loginContainer}>
			<h1>Login</h1>
			<LoginForm/>
		</div>
	)
}

export default Login
