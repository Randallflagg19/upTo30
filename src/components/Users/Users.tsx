import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
	updateStatus,
	selectUsers,
	selectTotalCount,
	selectCurrentPage,
	selectPageSize,
	setCurrentPage,
	toggleIsFetching,
	selectIsFetching,
	selectFollowingInProgress, unfollowUserById, followUserById, getUsersThunk
} from '../../store/usersSlice'
import {List, Avatar, Input, Spin} from 'antd'
import defaultAvatar from '../../assets/defaultAvatar.png'
import Paginator from '../common/Paginator/Paginator'
import {useSearchParams} from 'react-router-dom'
import {AppDispatch} from '../../store/store'
import User from './User'

const Users = () => {
	const dispatch = useDispatch<AppDispatch>()
	const users = useSelector(selectUsers)
	const isFetching = useSelector(selectIsFetching)
	const [inputValues, setInputValues] = useState<{ [key: number]: string }>({})
	const totalUsersCount = useSelector(selectTotalCount)
	const currentPage = useSelector(selectCurrentPage)
	const pageSize = useSelector(selectPageSize)
	const [searchParams, setSearchParams] = useSearchParams()

	const handleStatusChange = (userId: number) => {
		dispatch(updateStatus({userId, status: inputValues[userId] || null}))
		setInputValues(prevValues => ({...prevValues, [userId]: ''}))
	}

	const handlePageChange = (pageNumber: number) => {
		setSearchParams({page: String(pageNumber)})
		dispatch(setCurrentPage(pageNumber))
		dispatch(toggleIsFetching(true))
	}

	const handleFollow = (userId: number) => {
		dispatch(followUserById(userId))
	}

	const handleUnfollow = (userId: number) => {
		dispatch(unfollowUserById(userId))
	}

	useEffect(() => {
		const pageFromUrl = Number(searchParams.get('page')) || 1
		dispatch(setCurrentPage(pageFromUrl))
		dispatch(getUsersThunk({currentPage: pageFromUrl, pageSize}))
	}, [dispatch, searchParams, pageSize])

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
			) : (
				<List
					dataSource={users}
					renderItem={(user) => (
						<User
							user={user}
							followingInProgress={followingInProgress}
							onFollow={handleFollow}
							onUnfollow={handleUnfollow}
							onStatusChange={handleStatusChange}
							defaultAvatar={defaultAvatar}
						/>
					)}
				/>
			)}
		</>
	)
}

export default Users
