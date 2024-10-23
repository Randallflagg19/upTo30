import React, {useEffect} from 'react'
import './App.css'
import Header from './components/Header/Header'
import {Layout, Menu} from 'antd'
import {Route, Routes, useLocation, Link, Navigate, useNavigate} from 'react-router-dom'
import Dialogs from './components/Dialogs/Dialogs'
import Profile from './components/Profile/Profile'
import Translator from './components/Translator/Translator'
import Home from './components/Home/Home' // Импортируйте компонент Home

const {Content, Sider} = Layout

const routes = [
	{path: '/sn/profile', component: <Profile/>, label: 'Profile'},
	{path: '/sn/dialogs', component: <Dialogs/>, label: 'Dialogs'},
	{path: '/sn/news', component: <div>News</div>, label: 'News'},
	{path: '/sn/music', component: <div>Music</div>, label: 'Music'},
	{path: '/sn/settings', component: <div>Settings</div>, label: 'Settings'},
	{path: '/sn/users', component: <div>Users</div>, label: 'Users'}
]

const App: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/sn/profile', {replace: true})
		}
	}, [location.pathname, navigate])

	const renderMenuItems = () =>
		routes.map(route => (
			<Menu.Item key={route.path}>
				<Link to={route.path}>{route.label}</Link>
			</Menu.Item>
		))
	const renderRoutes = () =>
		routes.map(route => (
			<Route key={route.path} path={route.path} element={route.component}/>
		))

	const renderContent = () => {
		switch (true) {
			case location.pathname.startsWith('/sn'):
				return (
					<Layout>
						<Sider width={200} style={{background: '#fff'}}>
							<Menu mode="inline" selectedKeys={[location.pathname]}
							      style={{height: '100%', borderRight: 0}}>
								{renderMenuItems()}
							</Menu>
						</Sider>
						<Content style={{padding: 24, margin: 0, minHeight: 280}}>
							<Routes>
								{renderRoutes()}
							</Routes>
						</Content>
					</Layout>
				)
			case location.pathname.startsWith('/translator'):
				return (
					<Routes>
						<Route path="/translator/*" element={<Translator/>}/>
					</Routes>
				)
			case location.pathname.startsWith('/home'):
				return (
					<Routes>
						<Route path="/home" element={<Home/>}/>
					</Routes>
				)
			default:
				return <Navigate to="/sn/profile"/>
		}
	}

	return (
		<Layout>
			<Header/>
			{renderContent()}
		</Layout>
	)
}

export default App
