import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
	updateStatus,
	selectUsers,
	setUsers,
	setTotalUsersCount,
	selectTotalCount,
	selectCurrentPage,
	selectPageSize,
	setCurrentPage,
	toggleIsFetching,
	selectIsFetching,
	selectFollowingInProgress, unfollowUserById, followUserById, getUsersThunk
} from '../../Redux/usersSlice'
import {UserType} from '../../types'
import {Card, Button, List, Avatar, Input, Spin} from 'antd'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Paginator from '../common/Paginator/Paginator'
import {NavLink} from 'react-router-dom'
import {AppDispatch} from '../../Redux/store'
import styles from './Users.module.css'

const Users = () => {
	const dispatch = useDispatch<AppDispatch>()
	const users = useSelector(selectUsers)
	const isFetching = useSelector(selectIsFetching)
	const [inputValues, setInputValues] = useState<{ [key: number]: string }>({})
	const totalUsersCount = useSelector(selectTotalCount)
	const currentPage = useSelector(selectCurrentPage)
	const pageSize = useSelector(selectPageSize)

	const handleStatusChange = (userId: number) => {
		dispatch(updateStatus({userId, status: inputValues[userId] || null}))
		setInputValues(prevValues => ({...prevValues, [userId]: ''}))
	}

	const handlePageChange = (pageNumber: number) => {
		dispatch(setCurrentPage(pageNumber))
		dispatch(toggleIsFetching(true))
	}

	useEffect(() => {
		dispatch(getUsersThunk({currentPage, pageSize}))
	}, [dispatch, currentPage, pageSize])
	let followingInProgress = useSelector(selectFollowingInProgress)
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
						<List.Item className={styles.listItem}>
							<Card
								title={<strong>{user.name}</strong>}
								extra={user.followed ? (
									<Button type="primary" danger
									        disabled={followingInProgress.includes(user.id)}
									        onClick={() => dispatch(unfollowUserById(user.id))}>
										Отписаться
									</Button>
								) : (
									<Button type="primary"
									        disabled={followingInProgress.includes(user.id)}
									        onClick={() => dispatch(followUserById(user.id))}>
										Подписаться
									</Button>
								)}
								className={styles.card}>
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
