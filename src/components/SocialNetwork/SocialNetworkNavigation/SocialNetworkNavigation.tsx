import React from 'react'
import {Menu} from 'antd'
import {Link, useLocation} from 'react-router-dom'
import {routesSocialNetwork} from '../../../routes/routesSocialNetwork'
import {useSelector} from 'react-redux'
import {selectUserId} from '../../../store/authSlice'

const SocialNetworkNavigation = () => {
	const userId = useSelector(selectUserId)
	const location = useLocation()

	// Подготавливаем маршруты для меню
	const preparedRoutes = routesSocialNetwork
		.filter(route => route.label !== 'Login') // Убираем Login
		.map(route => ({
			...route,
			path: route.label === 'Моя страница' && userId ? `/sn/profile/${userId}` : route.path // Обрабатываем "Моя страница"
		}))

	// Генерируем элементы меню
	const menuItems = preparedRoutes.map(route => ({
		key: route.path,
		label: <Link to={route.path}>{route.label}</Link>
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
