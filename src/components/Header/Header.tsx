import React, {useState} from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {Menu, Avatar} from 'antd'

export default function Header() {
	const [selectedKey, setSelectedKey] = useState('1') // Начальное значение

	const handleMenuClick = (e: { key: string }) => {
		setSelectedKey(e.key) // Обновляем выбранный пункт
	}

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
					selectedKeys={[selectedKey]} // Используем состояние для выделения
					onClick={handleMenuClick} // Обработчик клика
					className={styles.menu}
				>
					<Menu.Item key="1">
						<NavLink to="/sn/profile">Social network</NavLink>
					</Menu.Item>
					<Menu.Item key="2">
						<NavLink to="/translator">Translator</NavLink>
					</Menu.Item>
					<Menu.Item key="3">
						<NavLink to="/home">Home</NavLink>
					</Menu.Item>
				</Menu>
			</div>
			{selectedKey === '1' && ( // Условный рендеринг
				<div className={styles.loginBlock}>
					<Avatar style={{backgroundColor: 'green', verticalAlign: 'middle'}}>
						A
					</Avatar>
					<button className={styles.loginButton}>
						<NavLink style={{color: 'white'}} to={'/login'}>Login</NavLink>
					</button>
				</div>
			)}
		</header>
	)
}
