import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {follow, unfollow, updateStatus, selectUsers, setUsers} from '../../Redux/usersSlice'
import {UserType} from '../../types'
import {Card, Button, List, Avatar, Input} from 'antd'
import axios from 'axios'
import defaultAvatar from '../../assets/defaultAvatar.png'

const Users = () => {
	const dispatch = useDispatch()
	const users = useSelector(selectUsers)
	const [inputValues, setInputValues] = useState<{ [key: number]: string }>({})

	const handleFollow = (userId: number) => {
		dispatch(follow(userId))
	}

	const handleUnfollow = (userId: number) => {
		dispatch(unfollow(userId))
	}

	const handleStatusChange = (userId: number) => {
		dispatch(updateStatus({userId, status: inputValues[userId] || null}))
		setInputValues(prevValues => ({...prevValues, [userId]: ''}))
	}

	useEffect(() => {
		axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response) => {
			const initialUsers: UserType[] = response.data.items
			console.log(response.data.items)
			dispatch(setUsers({users: initialUsers}))
		})
	}, [dispatch])

	return (
		<List
			dataSource={users}
			renderItem={(user: UserType) => (
				<List.Item style={{display: 'flex', justifyContent: 'center'}}>
					<Card
						title={<strong>{user.name}</strong>}
						extra={user.followed ? (
							<Button type="primary" danger onClick={() => handleUnfollow(user.id)}>
								Отписаться
							</Button>
						) : (
							<Button type="primary" onClick={() => handleFollow(user.id)}>
								Подписаться
							</Button>
						)}
						style={{width: 300}}
					>
						<Avatar
							size={64}
							src={user.photos.small || defaultAvatar}
							alt={user.name}
						/>
						<div style={{marginTop: '10px'}}>
							<span> {user.status || 'Нет статуса'}</span>
						</div>
						<Input
							placeholder="Обновить статус"
							value={inputValues[user.id] || ''}
							onChange={(e) => setInputValues({...inputValues, [user.id]: e.target.value})}
							onBlur={() => handleStatusChange(user.id)}
							style={{marginTop: '10px'}}
						/>
					</Card>
				</List.Item>
			)}
		/>
	)
}

export default Users
