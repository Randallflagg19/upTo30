import styles from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import React, {useEffect} from 'react'
import {getUserProfileThunk, selectProfile} from '../../Redux/profileSlice'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {Spin} from 'antd'
import {selectUserId} from '../../Redux/authSlice'
import {AppDispatch} from '../../Redux/store'
import WithAuthRedirect from '../../hoc/WithAuthRedirect'

const Profile: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const {userId} = useParams<{ userId: string }>()
	const profile = useSelector(selectProfile)

	const currentUserId = useSelector(selectUserId)
	useEffect(() => {
		if (!userId) {
			navigate(`/sn/profile/${currentUserId}`, {replace: true})
		}
		else {
			dispatch(getUserProfileThunk(userId))
		}
	}, [dispatch, userId, navigate])

	return (
		<div className={styles.content}>
			{profile ? <ProfileInfo profile={profile}/> : <Spin/>}
			<MyPosts/>
		</div>
	)
}

const AuthRedirectComponent = WithAuthRedirect(Profile)

export default AuthRedirectComponent
