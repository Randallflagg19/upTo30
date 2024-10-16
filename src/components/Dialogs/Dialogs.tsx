import React, {useRef} from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {DialogsType, MessagesType} from '../../types'

type Props = {
	dialogs: DialogsType
	messages: MessagesType
	newMessageText: string
	changeNewMessageText: (newMessageText: string) => void
	addMessage: () => void
}

const Dialogs: React.FC<Props> = ({
	dialogs, messages,
	newMessageText, changeNewMessageText, addMessage
}) => {

	const newMessageElement = useRef<HTMLTextAreaElement>(null)

	const dialogsElements = dialogs.map(
		dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>
	)
	const messagesElements = messages.map(
		message => <Message key={message.id} message={message.message} id={message.id}/>
	)

	const onMessageChange = () => {
		if (newMessageElement.current) {
			changeNewMessageText(newMessageElement.current.value)
		}
	}

	return (
		<div className={styles.dialogs}>
			<div className={styles.dialogsItems}>
				{dialogsElements}
			</div>
			<div className={styles.messages}>
				{messagesElements}
				<textarea onChange={onMessageChange} ref={newMessageElement} value={newMessageText}/>
				<button onClick={() => addMessage()}>Add message</button>
			</div>
		</div>

	)
}

export default Dialogs