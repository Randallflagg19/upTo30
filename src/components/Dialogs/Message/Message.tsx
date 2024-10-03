import React from 'react'
import styles from './Message.module.css'
import {MessageType} from '../../../types'

const Message: React.FC<MessageType> = ({message}) => {
	return <div className={styles.message}>{message}</div>
}

export default Message