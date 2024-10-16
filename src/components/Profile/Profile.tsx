import styles from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import React from 'react'
import {PostsType} from '../../types'

type ProfileProps = {
	posts: PostsType
	addPost: () => void
	newPostText: string
	changeNewPostText: (newPostText: string) => void
};

const Profile: React.FC<ProfileProps> = ({changeNewPostText, posts, addPost, newPostText}) => {
	return (
		<div className={styles.content}>
			<ProfileInfo/>
			<MyPosts changeNewPostText={changeNewPostText} posts={posts} addPost={addPost}
			         newPostText={newPostText}/>
		</div>
	)
}

export default Profile


