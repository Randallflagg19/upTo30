import styles from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import React from 'react'

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
	return (
		<div className={styles.content}>
			<ProfileInfo/>
			<MyPosts/>
		</div>
	)
}

export default Profile


