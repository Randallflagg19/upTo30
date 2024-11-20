import React from 'react'
import Profile from '../components/Profile/Profile'
import LazyLoader from '../utils/LazyLoader'

const Login = React.lazy(() => import('../components/Login/Login'))
const Users = React.lazy(() => import('../components/Users/Users'))
const Dialogs = React.lazy(() => import('../components/Dialogs/Dialogs'))

export const routesSocialNetwork = [
	{path: 'profile/:userId?', component: <Profile/>, label: 'Моя страница'},
	{path: 'dialogs', component: <LazyLoader Component={Dialogs}/>, label: 'Dialogs'},
	{path: 'news', component: <div>News</div>, label: 'News'},
	{path: 'music', component: <div>Music</div>, label: 'Music'},
	{path: 'settings', component: <div>Settings</div>, label: 'Settings'},
	{path: 'users', component: <LazyLoader Component={Users}/>, label: 'Users'},
	{path: 'login', component: <LazyLoader Component={Login}/>, label: 'Login'}

]