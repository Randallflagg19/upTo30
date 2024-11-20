import React from 'react'
import SocialNetworkNavigation from './SocialNetworkNavigation/SocialNetworkNavigation'
import {Layout} from 'antd'
import {Route, Routes} from 'react-router-dom'
import {routesSocialNetwork} from '../../routes/routesSocialNetwork'

import styles from './SocialNetwork.module.css'

const SocialNetwork = () => {
	return (
		<Layout>
			<Layout.Sider className={styles.sider}>
				<SocialNetworkNavigation/>
			</Layout.Sider>
			<Layout.Content className={styles.content}>
				<Routes>
					{routesSocialNetwork.map(route => (
						<Route key={route.path} path={route.path} element={route.component}/>
					))}
				</Routes>
			</Layout.Content>
		</Layout>
	)
}

export default SocialNetwork
