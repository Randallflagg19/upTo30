import React from 'react'
import styles from './Post.module.css'
import {PostType} from '../../../../types'

const Post: React.FC<PostType> = ({message, likesCount}) => {
	return (
		<div className={styles.item}>
			<img className={styles.image} src="https://rog.asus.com/media/1719369630894.jpg" alt="Post"/>
			{message}
			<div>
				<span>like {likesCount}</span>
			</div>
		</div>
	)
}

export default Post