import React, {useRef} from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import {PostsType} from '../../../types'
import {Button} from 'antd'
import TextArea from 'antd/es/input/TextArea'

type MyPostsProps = {
	posts: PostsType
	addPost: () => void
	newPostText: string
	changeNewPostText: (text: string) => void;
};

const MyPosts: React.FC<MyPostsProps> = ({
	posts, addPost, newPostText,
	changeNewPostText
}) => {

	const postsElements = posts.map(post => (
		<Post key={post.id} id={post.id} message={post.message} likesCount={post.likesCount}/>
	))

	const onPostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		changeNewPostText(event.target.value)
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
				<Button style={{marginTop: '10px'}} type="primary" onClick={addPost}>Add post</Button>
			</div>
			<div className={styles.posts}>
				{postsElements}
			</div>
		</div>
	)
}

export default MyPosts
