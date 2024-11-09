import React from 'react'
import Login from '../components/Translator/translatorComponents/Login/Login'
import Main from '../components/Translator/translatorComponents/Main/Main'

export const routesTranslator = [
	{path: '/', component: <Login/>, label: 'Логин'},
	{path: 'main', component: <Main/>, label: 'Main'},
	{path: '*', component: <h1>страничка не найдена</h1>, label: 'Not found'}
]