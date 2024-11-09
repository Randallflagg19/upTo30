import React from 'react'
import {useSelector} from 'react-redux'
import {selectIsAuth} from '../Redux/authSlice'
import {Navigate} from 'react-router-dom'

const WithAuthRedirect = (Component: React.ComponentType) => {
	const RedirectComponent: React.FC = (props) => {
		const isAuth = useSelector(selectIsAuth)
		if (!isAuth) return <Navigate to="/sn/login"/>
		return <Component {...props} />
	}
	return RedirectComponent
}

export default WithAuthRedirect
