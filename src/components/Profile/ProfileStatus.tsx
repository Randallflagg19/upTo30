import React, {useState, useEffect} from 'react'
import {Typography, Input} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {selectStatus, getStatusThunk, updateStatusThunk} from '../../store/profileSlice'
import {AppDispatch} from '../../store/store'

const {Text} = Typography

interface ProfileStatusProps {
	userId: string | null,
	isOwnProfile: boolean
}

const ProfileStatus: React.FC<ProfileStatusProps> = ({userId, isOwnProfile}) => {
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
		if (isOwnProfile) {
			setEditMode(true)
		}
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
					style={{
						cursor: isOwnProfile ? 'pointer' : 'default', // Скрытие интерактивности
						fontSize: '16px',
						color: '#555'
					}}
					editable={isOwnProfile ? {onStart: activateEditMode} : false}
					onDoubleClick={isOwnProfile ? activateEditMode : undefined}
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
