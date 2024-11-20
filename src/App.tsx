import React, {useEffect} from 'react'
import './App.css'
import Header from './components/Header/Header'
import {Layout, Spin} from 'antd'
import {Navigate, Route, Routes} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'
import {AppDispatch} from './store/store'
import {checkAuthThunk, selectIsAuthChecked} from './store/authSlice'
import LazyLoader from './utils/LazyLoader'

// Ленивый импорт компонентов
// Ленивый импорт компонентов
const Translator = React.lazy(() => import('./components/Translator/Translator'))
const Home = React.lazy(() => import('./components/Home/Home'))

const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const isAuthChecked = useSelector(selectIsAuthChecked)

	useEffect(() => {
		dispatch(checkAuthThunk())
	}, [dispatch])

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
				<Route path="/sn/*" element={<SocialNetwork/>}/>
				<Route path="/translator/*" element={<LazyLoader Component={Translator}/>}/>
				<Route path="/home" element={<LazyLoader Component={Home}/>}/>
				<Route path="/" element={<Navigate to="/sn/profile"/>}/>
			</Routes>
		</Layout>
	)
}

export default App
