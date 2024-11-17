import React, {useState, useEffect} from 'react'
import {Typography, Input} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {selectStatus, getStatusThunk, updateStatusThunk} from '../../store/profileSlice'
import {AppDispatch} from '../../store/store'

const {Text} = Typography

interface ProfileStatusProps {
	userId: string | null
}

const ProfileStatus: React.FC<ProfileStatusProps> = ({userId}) => {
	const dispatch = useDispatch<AppDispatch>()
	const userStatus = useSelector(selectStatus)
	const [status, setStatus] = useState(userStatus || 'No status yet')
	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		if (userId) {
			dispatch(getStatusThunk(userId))
		}
	}, [dispatch, userId])

	useEffect(() => {
		setStatus(userStatus || 'No status yet')
	}, [userStatus])

	const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(e.target.value)
	}

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		if (status !== userStatus) {
			dispatch(updateStatusThunk(status))
		}
	}

	return (
		<div>
			{!editMode ? (
				<Text
					style={{cursor: 'pointer', fontSize: '16px', color: '#555'}}
					editable={{onStart: activateEditMode}}
					onDoubleClick={activateEditMode}
				>
					{status}
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
