import Profile from '../components/Profile/Profile'
import Dialogs from '../components/Dialogs/Dialogs'
import Users from '../components/Users/Users'
import React from 'react'

export const routesSocialNetwork = [
	{path: 'profile/:userId?', component: <Profile/>, label: 'Моя страница'},
	{path: 'dialogs', component: <Dialogs/>, label: 'Dialogs'},
	{path: 'news', component: <div>News</div>, label: 'News'},
	{path: 'music', component: <div>Music</div>, label: 'Music'},
	{path: 'settings', component: <div>Settings</div>, label: 'Settings'},
	{path: 'users', component: <Users/>, label: 'Users'}
]