import React, {useRef} from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import {PostsType} from '../../../types'

type MyPostsProps = {
	posts: PostsType
	addPost: (message: string) => void
};

const MyPosts: React.FC<MyPostsProps> = ({posts, addPost}) => {

	const postsElements = posts.map(post => <Post key={post.id} id={post.id}
	                                              message={post.message}
	                                              likesCount={post.likesCount}/>)

	const newPostElement = useRef<HTMLTextAreaElement>(null)

	const onClickHandler = () => {
		debugger
		if (newPostElement.current?.value) {
			addPost(newPostElement.current.value)
			newPostElement.current.value = ''
		}
	}
	return (
		<div className={styles.postsBlock}>
			<h3> My posts</h3>
			<div>
				<div>
					<textarea ref={newPostElement}/>
				</div>
				<button onClick={onClickHandler}>Add post</button>
			</div>
			<div className={styles.posts}>
				{postsElements}
			</div>
		</div>
	)
}
export default MyPosts
