import {routesSocialNetwork} from '../../../routes/routesSocialNetwork'
import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {Content} from 'antd/es/layout/layout'

export const RenderRoutes = () => {
	return (
		<Content style={{padding: 24, margin: 0, minHeight: 280}}>

			<Routes>
				{routesSocialNetwork.map(route => (
					<Route key={route.path} path={route.path} element={route.component}/>
				))}
			</Routes>
		</Content>
	)
}