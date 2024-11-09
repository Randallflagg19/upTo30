import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../Translator'
import {AuthMessageContext} from '../../Translator'
import styles from './Login.module.css'
import api from '../../API/API'

export default function Login() {
	const {setIsLoggedIn, setIsGuest} = useContext(UserContext)
	const [login, setLogin] = useState('test')
	const [password, setPassword] = useState('test')
	const navigate = useNavigate()
	const {authMessage, setAuthMessage} = useContext(AuthMessageContext)

	const handleLogin = async () => {
		try {
			let res = await api.login(login, password)
			localStorage.setItem('TheToken', res.token)
			setIsLoggedIn(true)
			setTimeout(() => navigate('/translator/main'), 500)
			setAuthMessage('Добро пожаловать')
			setTimeout(() => setAuthMessage('Требуется авторизация'), 500)
		}
		catch (error) {
			setIsLoggedIn(false)
			setAuthMessage('Неправильный логин или пароль')
		}
	}

	const handleRegistration = async () => {
		try {
			let res = await api.registration(login, password)
			res
				? setAuthMessage('Вы зарегистрированы')
				: setAuthMessage('Пользователь уже зарегистрирован')
		}
		catch (error) {
			setAuthMessage('Ошибка при регистрации')
		}
	}

	const handleGuestLogin = () => {
		localStorage.setItem('isGuest', 'true')
		setIsGuest(true)
		setIsLoggedIn(false)
		navigate('/translator/main')
	}

	const handleFocus = (setter: string) => {
		if (setter === 'login' && login === 'test') {
			setLogin('')
		}
		else if (setter === 'password' && password === 'test') {
			setPassword('')
		}
	}

	return (
		<div className={styles.authWrapper}>
			<h1 className={styles.authMessage}>{authMessage}</h1>
			<input
				type="text"
				onFocus={() => handleFocus('login')}
				onChange={(e) => setLogin(e.target.value)}
				value={login}
			/>
			<input
				type="password"
				onFocus={() => handleFocus('password')}
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<button className={styles.loginButton} onClick={handleLogin}>
				Login
			</button>
			<button className={styles.loginButton} onClick={handleGuestLogin}>
				Войти как гость
			</button>
			<button className={styles.loginButton} onClick={handleRegistration}>
				Зарегистрироваться
			</button>
		</div>
	)
}
