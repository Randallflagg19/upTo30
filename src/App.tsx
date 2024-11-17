import React, {useEffect} from 'react'
import './App.css'
import Header from './components/Header/Header'
import {Layout, Spin} from 'antd'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Translator from './components/Translator/Translator'
import Home from './components/Home/Home'
import {useDispatch, useSelector} from 'react-redux'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'
import {AppDispatch} from './store/store'
import {checkAuthThunk, selectIsAuthChecked} from './store/authSlice'

const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const isAuthChecked = useSelector(selectIsAuthChecked)
	const nav = useNavigate()
	useEffect(() => {
		dispatch(checkAuthThunk()) // Проверяем авторизацию при загрузке
	}, [dispatch])

	useEffect(() => {
		nav('/sn/profile')
	}, [])

	// Пока авторизация не проверена, показываем загрузочный индикатор
	if (!isAuthChecked) {
		return (
			<div
				style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
				<Spin size="large"/>
			</div>
		)
	}

	return (
		<Layout>
			<Header/>
			<Routes>
				<Route path={'/sn/*'} element={<SocialNetwork/>}/>
				<Route path="/translator/*" element={<Translator/>}/>
				<Route path="/home" element={<Home/>}/>
			</Routes>
		</Layout>
	)
}

export default App

