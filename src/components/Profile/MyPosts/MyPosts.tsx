import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import {PostsType} from '../../../types'
import {Button} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import {useDispatch, useSelector} from 'react-redux'
import {
	addPost,
	changeNewPostText,
	selectNewPostText,
	selectPosts
} from '../../../Redux/profileSlice'

type MyPostsProps = {};

const MyPosts: React.FC = () => {
	const dispatch = useDispatch()
	const posts = useSelector(selectPosts)
	const newPostText = useSelector(selectNewPostText)
	const addNewPost = () => dispatch(addPost())
	const updateNewPostText = (text: string) => dispatch(changeNewPostText(text))

	const postsElements = posts.map(post => (
		<Post key={post.id} id={post.id} message={post.message} likesCount={post.likesCount}/>
	))

	const onPostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		updateNewPostText(event.target.value)
	}

	return (
		<div className={styles.postsBlock}>
			<h3> My posts</h3>
			<div>
				<div>
					<TextArea
						style={{width: '300px', height: 'auto'}}
						autoSize={{minRows: 3, maxRows: 8}}
						onChange={onPostChange}
						value={newPostText}
					/>
				</div>
				<Button style={{marginTop: '10px'}} type="primary" onClick={addNewPost}>Add post</Button>
			</div>
			<div className={styles.posts}>
				{postsElements}
			</div>
		</div>
	)
}

export default MyPosts
