import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {Spin} from 'antd'
import {getUserProfileThunk, selectProfile} from '../../store/profileSlice'
import {selectUserId} from '../../store/authSlice'
import {AppDispatch} from '../../store/store'
import WithAuthRedirect from '../../hoc/WithAuthRedirect'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import styles from './Profile.module.css'

const Profile: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const profile = useSelector(selectProfile)
	const {userId} = useParams<{ userId: string }>()
	const authedUserId = useSelector(selectUserId)
	const isOwnProfile = Number(userId) === authedUserId

	//грузим профиль
	useEffect(() => {
		//если никто не выбран грузим профиль авторизованного пользователя
		if (!userId && authedUserId) {
			navigate(`/sn/profile/${authedUserId}`, {replace: true})
		}
		//если выбран то грузим его
		else if (userId) {
			dispatch(getUserProfileThunk(userId))
		}
	}, [dispatch, userId, authedUserId, navigate])
	return (
		<div className={styles.content}>
			{profile ? (
				<ProfileInfo profile={profile} isOwnProfile={isOwnProfile}
				             userId={(userId || authedUserId) as string}/>
			) : (
				<Spin/>
			)}
			<MyPosts/>
		</div>
	)
}
const AuthRedirectComponent = WithAuthRedirect(Profile)
export default AuthRedirectComponent

