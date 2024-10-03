import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'

export default function Header(props: any) {

	return (
		<header className={styles.header}>
			<img
				src="https://avatars.mds.yandex.net/i?id=1394fddc1c1dad6261477b2158ee1f24f7f26959-8496968-images-thumbs&n=13"
				alt=""
			/>
			<div className={styles.loginBlock}>

				<NavLink to={'/login'}>Login</NavLink>
			</div>
		</header>
	)
}
