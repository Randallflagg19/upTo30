import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {Menu} from 'antd'

export default function Header(props: any) {
	const items = [
		{key: '1', label: <NavLink to="/sn/profile">Social network</NavLink>},
		{key: '2', label: <NavLink to="/translator">Translator</NavLink>},
		{key: '3', label: <NavLink to="/">Home</NavLink>}
	]

	return (
		<header className={styles.header}>
			<img
				src="https://avatars.mds.yandex.net/i?id=1394fddc1c1dad6261477b2158ee1f24f7f26959-8496968-images-thumbs&n=13"
				alt="Logo"
				className={styles.logo}
			/>
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['1']}
				items={items}
				className={styles.menu}
			/>
			<div className={styles.loginBlock}>
				<NavLink to={'/login'}>Login</NavLink>
			</div>
		</header>
	)
}
