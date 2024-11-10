import React, {useEffect} from 'react'
import './App.css'
import Header from './components/Header/Header'
import {Layout} from 'antd'
import {Route, Routes} from 'react-router-dom'
import Translator from './components/Translator/Translator'
import Home from './components/Home/Home'
import {useDispatch} from 'react-redux'
import {checkAuthThunk} from './Redux/authSlice'
import SocialNetwork from './components/SocialNetwork/SocialNetwork'
import {AppDispatch} from './Redux/store'

const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(checkAuthThunk())
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
