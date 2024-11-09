import React, {useEffect} from 'react'
import './App.css'
import Header from './components/Header/Header'
import {Layout} from 'antd'
import {Route, Routes} from 'react-router-dom'
import Translator from './components/Translator/Translator'
import Home from './components/Home/Home'
import {useDispatch} from 'react-redux'
import {setAuthUserData} from './Redux/authSlice'
import {authAPI} from './api/authAPI'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'

const App: React.FC = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		authAPI.checkAuth()
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
