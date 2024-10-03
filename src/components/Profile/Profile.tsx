import styles from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import React from 'react'
import {PostsType} from '../../types'

type ProfileProps = {
	posts: PostsType
	addPost: (message: string) => void
};

const Profile: React.FC<ProfileProps> = ({posts, addPost}) => {
	return (
		<div className={styles.content}>
			<ProfileInfo/>
			<MyPosts posts={posts} addPost={addPost}/>
		</div>
	)
}

export default Profile


