import React from 'react'
import {Menu} from 'antd'
import {Link, useLocation} from 'react-router-dom'
import {routesSocialNetwork} from '../../../routes/routesSocialNetwork'
import {useSelector} from 'react-redux'
import {selectUserId} from '../../../store/authSlice'

const SocialNetworkNavigation = () => {
	const userId = useSelector(selectUserId)
	const location = useLocation()

	const menuItems = routesSocialNetwork.map(route => ({
		key: route.path,
		label: route.label === 'Моя страница' ? (
			<Link to={userId ? `/sn/profile/${userId}` : '/sn/profile'}>{route.label}</Link>
		) : (
			<Link to={route.path}>{route.label}</Link>
		)
	}))

	return (
		<Menu
			mode="inline"
			selectedKeys={[location.pathname]}
			style={{height: '100%', borderRight: 0}}
			items={menuItems}
		/>
	)
}

export default SocialNetworkNavigation
