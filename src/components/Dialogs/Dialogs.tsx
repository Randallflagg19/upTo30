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
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {composeValidators, maxLength, minLength, required} from '../../utils/validators/validators'
import {Button, Input} from 'antd'

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
			{({handleSubmit, errors, touched}) => (
				<Form onSubmit={handleSubmit}
				      style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px'}}>
					<Field
						as={Input.TextArea}
						name="newMessageBody"
						className={errors.newMessageBody && touched.newMessageBody ? styles.errorBorder : ''}
						placeholder="Enter your message"
						autoSize={{minRows: 3, maxRows: 15}}
						validate={composeValidators(required, maxLength(50), minLength(2))}
						status={errors.newMessageBody && touched.newMessageBody ? 'error' : ''}
					/>
					<ErrorMessage name="newMessageBody">
						{msg => <div style={{color: 'red'}}>{msg}</div>}
					</ErrorMessage>

					<Button type="primary" htmlType="submit" style={{alignSelf: 'flex-start'}}>
						Add message
					</Button>
				</Form>
			)}
		</Formik>
	)
}

const AuthRedirectComponent = compose(WithAuthRedirect)(Dialogs)

export default AuthRedirectComponent
