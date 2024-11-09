import React, {useRef} from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {useDispatch, useSelector} from 'react-redux'
import {selectDialogs} from '../../Redux/dialogsSlice'
import {
	addMessage,
	changeNewMessageText,
	selectMessages,
	selectNewMessageText
} from '../../Redux/messageSlice'
import {selectIsAuth} from '../../Redux/authSlice'
import {Navigate} from 'react-router-dom'

type DialogsProps = {}

const Dialogs: React.FC<DialogsProps> = () => {

	const dispatch = useDispatch()
	const messages = useSelector(selectMessages)
	const newMessageText = useSelector(selectNewMessageText)
	const sendMessage = () => dispatch(addMessage())
	const updateNewMessageText = (text: string) => dispatch(changeNewMessageText(text))

	const dialogs = useSelector(selectDialogs)
	const isAuth = useSelector(selectIsAuth)

	const newMessageElement = useRef<HTMLTextAreaElement>(null)

	const dialogsElements = dialogs.map(
		dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>
	)
	const messagesElements = messages.map(
		message => <Message key={message.id} message={message.message} id={message.id}/>
	)

	const onMessageChange = () => {
		if (newMessageElement.current) {
			updateNewMessageText(newMessageElement.current.value)
		}
	}
	{
		if (!isAuth) {
			return <Navigate to="/sn/login"/>
		}
		else
			return (
				<div className={styles.dialogs}>
					<div className={styles.dialogsItems}>
						{dialogsElements}
					</div>
					<div className={styles.messages}>
						{messagesElements}
						<textarea onChange={onMessageChange} ref={newMessageElement} value={newMessageText}/>
						<button onClick={() => sendMessage()}>Add message</button>
					</div>
				</div>
			)
	}
}

export default Dialogs