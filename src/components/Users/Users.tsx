import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
	follow,
	unfollow,
	updateStatus,
	selectUsers,
	setUsers,
	setTotalUsersCount,
	selectTotalCount,
	selectCurrentPage,
	selectPageSize,
	setCurrentPage,
	toggleIsFetching, selectIsFetching
} from '../../Redux/usersSlice'
import {UserType} from '../../types'
import {Card, Button, List, Avatar, Input, Spin} from 'antd'
import axios from 'axios'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Paginator from '../common/Paginator/Paginator'
import {NavLink} from 'react-router-dom'

const Users = () => {
	const dispatch = useDispatch()
	const users = useSelector(selectUsers)
	const isFetching = useSelector(selectIsFetching)
	const [inputValues, setInputValues] = useState<{ [key: number]: string }>({})
	const totalUsersCount = useSelector(selectTotalCount)
	const currentPage = useSelector(selectCurrentPage)
	const pageSize = useSelector(selectPageSize)

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

	const handlePageChange = (pageNumber: number) => {
		dispatch(setCurrentPage(pageNumber))
		dispatch(toggleIsFetching(true))
	}

	useEffect(() => {
		dispatch(toggleIsFetching(true))
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`)
			.then((response) => {
				dispatch(setUsers({users: response.data.items}))
				dispatch(setTotalUsersCount(response.data.totalCount))
			})
			.finally(() => dispatch(toggleIsFetching(false))) // Stop fetching in finally block
	}, [dispatch, currentPage, pageSize])

	return (
		<>
			<Paginator
				totalItemsCount={totalUsersCount}
				pageSize={pageSize}
				currentPageNumber={currentPage}
				onPageChanged={handlePageChange}
				portionSize={10}
			/>
			{isFetching ? (
					<div className="preloader-overlay">
						<Spin size="large"/>
					</div>
				) :
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
								<NavLink to={`/sn/profile/${user.id}`}>
									<Avatar
										size={64}
										src={user.photos.small || defaultAvatar}
										alt={user.name}
									/>
								</NavLink>
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
			}

		</>
	)
}

export default Users
