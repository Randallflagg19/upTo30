import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './TrComponents/Login/Login'
import './Translator.css'
import Main from './TrComponents/Main/Main'

export const UserContext = React.createContext<{
		isLoggedIn: boolean;
		isGuest: boolean;
		setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
		setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
	}
	| any
>(null)
export const AuthMessageContext = React.createContext<
	| {
	authMessage: string;
	setAuthMessage: React.Dispatch<React.SetStateAction<string>>;
}
	| any
>(null)

function Translator() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isGuest, setIsGuest] = useState(false)
	const [authMessage, setAuthMessage] = useState('Требуется авторизация')
	return (
		<UserContext.Provider value={{isLoggedIn, setIsLoggedIn, isGuest, setIsGuest}}>
			<AuthMessageContext.Provider value={{authMessage, setAuthMessage}}>
				<Routes>
					<Route path="/" element={<Login/>}/>
					<Route path="main" element={<Main/>}/>
					<Route path="*" element={<h1>страничка не найдена</h1>}/>
				</Routes>
			</AuthMessageContext.Provider>
		</UserContext.Provider>
	)
}

export default Translator
