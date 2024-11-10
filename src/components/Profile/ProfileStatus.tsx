import React, {useState} from 'react'
import {Typography, Input} from 'antd'

const {Text} = Typography

const ProfileStatus: React.FC = () => {
	const [status, setStatus] = useState('Your status')
	const [editMode, setEditMode] = useState(false)

	const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(e.target.value)
	}

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
	}

	return (
		<div>
			{!editMode ? (
				<Text
					style={{cursor: 'pointer', fontSize: '16px', color: '#555'}}
					editable={{
						onStart: activateEditMode
					}}
					onDoubleClick={activateEditMode}
				>
					{status || 'No status yet'}
				</Text>
			) : (
				<Input
					value={status}
					onChange={onStatusChange}
					onBlur={deactivateEditMode}
					onPressEnter={deactivateEditMode}
					autoFocus
					style={{width: 200}}
				/>
			)}
		</div>
	)
}

export default ProfileStatus
