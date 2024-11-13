import React from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {useDispatch, useSelector} from 'react-redux'
import {selectDialogs} from '../../Redux/dialogsSlice'
import {
	addMessage,
	selectMessages
} from '../../Redux/messageSlice'
import WithAuthRedirect from '../../hoc/WithAuthRedirect'
import {compose} from '@reduxjs/toolkit'
import {Field, Form, Formik} from 'formik'

type DialogsProps = {}

const Dialogs: React.FC<DialogsProps> = () => {

	const dispatch = useDispatch()
	const messages = useSelector(selectMessages)

	const dialogs = useSelector(selectDialogs)

	const dialogsElements = dialogs.map(
		dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>
	)
	const messagesElements = messages.map(
		message => <Message key={message.id} message={message.message} id={message.id}/>
	)

	const addNewMessage = (message: string) => {
		dispatch(addMessage(message))
	}
	{
		return (
			<div className={styles.dialogs}>
				<div className={styles.dialogsItems}>
					{dialogsElements}
				</div>
				<div className={styles.messages}>
					{messagesElements}
					<AddMessageForm onSubmit={addNewMessage}/>
				</div>
			</div>
		)
	}
}

interface AddMessageFormProps {
	onSubmit: (message: string) => void
}

const AddMessageForm: React.FC<AddMessageFormProps> = ({onSubmit}) => {
	return (
		<Formik
			initialValues={{newMessageBody: ''}}
			onSubmit={(values, {resetForm}) => {
				onSubmit(values.newMessageBody)
				resetForm()
			}}
		>
			{({handleSubmit}) => (
				<Form onSubmit={handleSubmit}>
					<Field
						component="textarea"
						name="newMessageBody"
						placeholder="Enter your message"
					/>
					<button type="submit">Add message</button>
				</Form>
			)}
		</Formik>
	)
}

const AuthRedirectComponent = compose(WithAuthRedirect)(Dialogs)

export default AuthRedirectComponent