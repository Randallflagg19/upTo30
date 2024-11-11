import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {Spin} from 'antd'
import {getUserProfileThunk, selectProfile} from '../../Redux/profileSlice'
import {selectUserId} from '../../Redux/authSlice'
import {AppDispatch} from '../../Redux/store'
import WithAuthRedirect from '../../hoc/WithAuthRedirect'
import {compose} from '@reduxjs/toolkit'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import styles from './Profile.module.css'

const Profile: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const profile = useSelector(selectProfile)
	const {userId} = useParams<{ userId: string }>()
	const currentUserId = useSelector(selectUserId)

	useEffect(() => {
		if (!userId && currentUserId) {
			navigate(`/sn/profile/${currentUserId}`, {replace: true})
		}
		else if (userId) {
			dispatch(getUserProfileThunk(userId))
		}
	}, [dispatch, userId, currentUserId, navigate])

	return (
		<div className={styles.content}>
			{profile ? (
				<ProfileInfo profile={profile} userId={(userId || currentUserId) as string}/>
			) : (
				<Spin/>
			)}
			<MyPosts/>
		</div>
	)
}

const AuthRedirectComponent = compose(WithAuthRedirect)(Profile)
export default AuthRedirectComponent
