import React from 'react'
import {useSelector} from 'react-redux'
import {selectIsAuth} from '../Redux/authSlice'
import {Navigate} from 'react-router-dom'

const AuthRedirect = (Component) => {
	const isAuth = useSelector(selectIsAuth)
	if (!isAuth) return <Navigate to="/sn/login"/>
	return <Profile/>
}

export default AuthRedirect