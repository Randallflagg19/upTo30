import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './translatorComponents/Login/Login'
import './Translator.css'
import Main from './translatorComponents/Main/Main'
import {routesTranslator} from '../../routes/routesTranslator'

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
					{routesTranslator.map((route) => (
						<Route key={route.path} path={route.path} element={route.component}/>))}
				</Routes>
			</AuthMessageContext.Provider>
		</UserContext.Provider>
	)
}

export default Translator
