import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {Spin} from 'antd'
import {selectIsAuth, selectIsAuthChecked} from '../store/authSlice'

const WithAuthRedirect = <P extends object>(Component: React.ComponentType<P>) => {
	const RedirectComponent: React.FC<P> = (props) => {
		const isAuth = useSelector(selectIsAuth)
		const isAuthChecked = useSelector(selectIsAuthChecked)

		if (!isAuthChecked) {
			return <Spin/>
		}

		if (!isAuth) {
			return <Navigate to="/sn/login" replace/>
		}

		return <Component {...props} />
	}

	return RedirectComponent
}

export default WithAuthRedirect
