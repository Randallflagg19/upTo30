import React, {useContext} from 'react'
import styles from './PostItem.module.css'
import {UserContext} from '../../Translator'
import api from '../../API/API'

type PostItemProps = {
	post: {
		id: number,
		word: string,
		translation: string,
	}
	onDelete: (id: number) => void
}

const PostItem: React.FC<PostItemProps> = ({post, onDelete}) => {
	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			'Вы действительно хотите удалить это слово?'
		)
		if (confirmDelete) {
			const id = post.id
			try {
				await api.delete(id)
				console.log(`Word with id ${id} has been deleted.`)
				onDelete(id)
			}
			catch (error) {
				console.error(`Error deleting word with id ${id}:`, error)
			}
		}
	}

	const {isLoggedIn} = useContext(UserContext)

	return (
		<>
			<div className={styles.post}>
				<strong>
					{post.word} - {post.translation}
				</strong>
				{isLoggedIn && (
					<button
						className={styles.imageButton}
						onClick={handleDelete}
					></button>
				)}
			</div>
		</>
	)
}

export default PostItem
