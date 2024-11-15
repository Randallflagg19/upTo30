import React from 'react'
import SocialNetworkNavigation from './SocialNetworkNavigation/SocialNetworkNavigation'
import {Layout} from 'antd'
import Sider from 'antd/es/layout/Sider'
import {Route, Routes} from 'react-router-dom'
import {routesSocialNetwork} from '../../routes/routesSocialNetwork'
import {Content} from 'antd/es/layout/layout'

const SocialNetwork = () => {
	
	return <Layout>
		<Sider width={200} style={{background: '#fff'}}>
			<SocialNetworkNavigation/>
		</Sider>
		<Content style={{padding: 24, margin: 0, minHeight: 280}}>
			<Routes>
				{routesSocialNetwork.map(route => (
					<Route key={route.path} path={route.path} element={route.component}/>
				))}
			</Routes>
		</Content>
	</Layout>

}

export default SocialNetwork