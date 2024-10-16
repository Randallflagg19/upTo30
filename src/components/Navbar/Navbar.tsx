import React from 'react'
import styles from './Navbar.module.css'
import {NavLink} from 'react-router-dom'

export default function Navbar() {
	return (
		<nav className={styles.nav}>
			<div className={styles.item}>
				<NavLink to="/sn/profile">Profile</NavLink>
			</div>
			<div className={`${styles.item} ${styles.active}`}>
				<NavLink to="/sn/dialogs">Messages</NavLink>
			</div>
			<div className={styles.item}>
				<NavLink to="/sn/news">News</NavLink>
			</div>
			<div className={styles.item}>
				<NavLink to="/sn/music">Music</NavLink>
			</div>
			<div className={styles.item}>
				<NavLink to="/sn/settings">Settings</NavLink>
			</div>
			<div className={styles.item}>
				<NavLink to="/sn/users">Users</NavLink>
			</div>
		</nav>
	)
}
