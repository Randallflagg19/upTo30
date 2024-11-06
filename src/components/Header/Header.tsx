import React, {useEffect, useState} from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {Menu, Avatar} from 'antd'
import axios from 'axios'
import {setUserProfile} from '../../Redux/profileSlice'
import {useDispatch, useSelector} from 'react-redux'
import {setAuthUserData, selectIsAuth, selectLogin} from '../../Redux/authSlice'

export default function Header() {
	const [selectedKey, setSelectedKey] = useState('1')
	const isAuth = useSelector(selectIsAuth)
	const loginFirstLetter = useSelector(selectLogin)
	const dispatch = useDispatch()
	useEffect(() => {
		axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
			{withCredentials: true})
			.then((response) => {
				console.log(response.data)
				if (response.data.resultCode === 0)
					dispatch(setAuthUserData(response.data))

			})

	}, [])

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
					className={styles.menu}
				>
					<Menu.Item key="1">
						<NavLink to="/sn/profile">Social Network</NavLink>
					</Menu.Item>
					<Menu.Item key="2">
						<NavLink to="/translator">Translator</NavLink>
					</Menu.Item>
					<Menu.Item key="3">
						<NavLink to="/home">Home</NavLink>
					</Menu.Item>
				</Menu>
			</div>
			{selectedKey === '1' && (
				<div className={styles.loginBlock}>
					{isAuth ? (
						<Avatar style={{backgroundColor: 'green', verticalAlign: 'middle'}}>
							{loginFirstLetter}
						</Avatar>
					) : (
						<button className={styles.loginButton}>
							<NavLink style={{color: 'white'}} to="/login">
								Login
							</NavLink>
						</button>
					)}
				</div>
			)}
		</header>
	)
}
