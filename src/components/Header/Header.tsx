import React, {useEffect, useState} from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {Menu, Avatar} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {
	selectIsAuth,
	selectLogin,
	checkAuthThunk,
	logoutThunk
} from '../../store/authSlice'
import {AppDispatch} from '../../store/store'

export default function Header() {
	const [selectedKey, setSelectedKey] = useState('1')
	const isAuth = useSelector(selectIsAuth)
	const currentUserLogin = useSelector(selectLogin)
	const dispatch = useDispatch<AppDispatch>()

	const handleLogout = () => {
		dispatch(logoutThunk())
	}

	const menuItems = [
		{
			label: <NavLink to="/sn/profile">Social Network</NavLink>,
			key: '1'
		},
		{
			label: <NavLink to="/translator">Translator</NavLink>,
			key: '2'
		},
		{
			label: <NavLink to="/home">Home</NavLink>,
			key: '3'
		}
	]

	return (
		<header className={styles.header}>
			<img
				src="https://avatars.mds.yandex.net/i?id=1394fddc1c1dad6261477b2158ee1f24f7f26959-8496968-images-thumbs&n=13"
				alt="Logo"
				className={styles.logo}
			/>
			<div className={styles.menuContainer}>
				<Menu
					theme="dark"
					mode="horizontal"
					selectedKeys={[selectedKey]}
					onClick={(e) => setSelectedKey(e.key)}
					items={menuItems}
					className={styles.menu}
				/>
			</div>
			{selectedKey === '1' && (
				<div className={styles.loginBlock}>
					{isAuth ? (<>
							<button onClick={handleLogout} className={styles.logoutButton}>
								{/*<NavLink style={{color: 'white'}} to="/sn/login">*/}
								logout
								{/*</NavLink>*/}
							</button>
							<Avatar style={{backgroundColor: 'green', verticalAlign: 'middle'}}>
								{currentUserLogin}
							</Avatar>
						</>

					) : (
						<button className={styles.loginButton}>
							<NavLink style={{color: 'white'}} to="/sn/login">
								Login
							</NavLink>
						</button>
					)}
				</div>
			)}
		</header>
	)
}
