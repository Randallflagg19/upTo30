import React, {FC, useState} from 'react'
import {UserType} from '../../types'
import {Card, Button, Avatar, Input} from 'antd'
import {NavLink} from 'react-router-dom'
import styles from './User.module.css'

type UserProps = {
	user: UserType
	followingInProgress: number[]
	onFollow: (userId: number) => void
	onUnfollow: (userId: number) => void
	onStatusChange: (userId: number, status: string | null) => void
	defaultAvatar: string
}

const User: FC<UserProps> = ({
	user,
	followingInProgress,
	onFollow,
	onUnfollow,
	onStatusChange,
	defaultAvatar
}) => {
	const [inputValue, setInputValue] = useState<string>('')

	const handleBlur = () => {
		onStatusChange(user.id, inputValue || null)
		setInputValue('')
	}

	return (
		<Card
			title={<strong>{user.name}</strong>}
			extra={user.followed ? (
				<Button
					type="primary"
					danger
					disabled={followingInProgress.includes(user.id)}
					onClick={() => onUnfollow(user.id)}
				>
					Отписаться
				</Button>
			) : (
				<Button
					type="primary"
					disabled={followingInProgress.includes(user.id)}
					onClick={() => onFollow(user.id)}
				>
					Подписаться
				</Button>
			)}
			className={styles.card}
		>
			<NavLink to={`/sn/profile/${user.id}`}>
				<Avatar
					size={64}
					src={user.photos.small || defaultAvatar}
					alt={user.name}
				/>
			</NavLink>
			<div style={{marginTop: '10px'}}>
				<span>{user.status || 'Нет статуса'}</span>
			</div>
			<Input
				placeholder="Обновить статус"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onBlur={handleBlur}
				style={{marginTop: '10px'}}
			/>
		</Card>
	)
}

export default User
