import styles from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import React, {useEffect, useState} from 'react'
import {setUserProfile} from '../../Redux/profileSlice'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {ProfileType} from '../../types'
import {Spin} from 'antd'
import {getUserProfile} from '../../api/api'
import {selectUserId} from '../../Redux/authSlice'

const Profile: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {userId} = useParams<{ userId: string }>()
	const [profile, setProfile] = useState<ProfileType | null>(null)

	const currentUserId = useSelector(selectUserId)
	useEffect(() => {
		if (!userId) {
			navigate(`/sn/profile/${currentUserId}`, {replace: true})
		}
		else {
			getUserProfile(userId)
				.then((response) => {
					setProfile(response)
					dispatch(setUserProfile(response))
				})
				.catch((error) => console.error('Ошибка при загрузке профиля:', error))
		}
	}, [dispatch, userId, navigate])

	return (
		<div className={styles.content}>
			{profile ? <ProfileInfo profile={profile}/> : <Spin/>}
			<MyPosts/>
		</div>
	)
}

export default Profile
