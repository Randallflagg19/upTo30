import styles from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {setUserProfile} from '../../Redux/profileSlice'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {ProfileType} from '../../types'

const Profile: React.FC = () => {
	const dispatch = useDispatch()
	let {userId} = useParams<{ userId: string }>() // Получаем userId из параметров маршрута
	const [profile, setProfile] = useState<ProfileType | null>(null) // Локальное состояние для профиля

	useEffect(() => {
		if (!userId) {
			userId = '31594'
		}
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
			.then((response) => {
				setProfile(response.data) // Сохраняем профиль в локальном состоянии
				dispatch(setUserProfile(response.data)) // Обновляем Redux, если нужно
			})
			.catch((error) => console.error('Ошибка при загрузке профиля:', error))
	}, [dispatch, userId])

	return (
		<div className={styles.content}>
			{profile ? <ProfileInfo profile={profile}/> :
				<p>Загрузка..</p>}
			<MyPosts/>


		</div>
	)
}

export default Profile
