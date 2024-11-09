import React, {useEffect, useState} from 'react'
import './App.css'
import Header from './components/Header/Header'
import {Layout} from 'antd'
import {Route, Routes, useNavigate} from 'react-router-dom'
import Translator from './components/Translator/Translator'
import Home from './components/Home/Home'
import {useDispatch, useSelector} from 'react-redux'
import {setAuthUserData} from './Redux/authSlice'
import {checkAuth} from './api/api'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'

const App: React.FC = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		checkAuth()
			.then(response => {
				if (response.resultCode === 0) {
					dispatch(setAuthUserData(response))
				}
			})
	}, [dispatch])

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
