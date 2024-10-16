import styles from './DialogItem.module.css'
import {NavLink} from 'react-router-dom'
import {DialogType} from '../../../types'
import React from 'react'

const DialogItem: React.FC<DialogType> = ({id, name}) => {
	let path = '/dialogs/' + id
	return (
		<div className={styles.dialog + ' ' + styles.active}>
			<NavLink to={path}>{name}</NavLink>
		</div>
	)
}

export default DialogItem



