import React from 'react'
import styles from './MyPosts.module.css'
import Post from './Post/Post'
import {Button} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import {useDispatch, useSelector} from 'react-redux'
import {
	addPost,
	selectPosts
} from '../../../Redux/profileSlice'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import {
	required,
	maxLength,
	minLength,
	composeValidators
} from '../../../utils/validators/validators'

const MyPosts: React.FC = () => {
	const dispatch = useDispatch()
	const posts = useSelector(selectPosts)

	const postsElements = posts.map(post => (
		<Post key={post.id} id={post.id} message={post.message} likesCount={post.likesCount}/>
	))

	const addNewPost = (postText: string) => {
		dispatch(addPost(postText))
	}

	return (
		<div className={styles.postsBlock}>
			<h3>My posts</h3>
			<PostsForm onSubmit={addNewPost}/>
			<div className={styles.posts}>
				{postsElements}
			</div>
		</div>
	)
}

type PostsFormType = {
	onSubmit: (message: string) => void
}

const PostsForm: React.FC<PostsFormType> = ({onSubmit}) => {
	return (
		<Formik
			initialValues={{postText: ''}}
			onSubmit={(values, {resetForm}) => {
				onSubmit(values.postText)
				resetForm()
			}}
		>
			{({handleSubmit}) => (
				<Form onSubmit={handleSubmit}>
					<div>
						<Field
							as={TextArea}
							name="postText"
							style={{width: '300px', height: 'auto'}}
							autoSize={{minRows: 3, maxRows: 8}}
							placeholder="Enter your post"
							validate={composeValidators(required, maxLength(15), minLength(2))}
						/>
						<div style={{color: 'red'}}>
							<ErrorMessage name="postText" component="div"/>
						</div>
					</div>
					<Button style={{marginTop: '10px'}} type="primary" htmlType="submit">
						Add post
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default MyPosts
