import React, {useState, useEffect} from 'react'
import {Pagination} from 'antd'
import styles from './Paginator.module.css'

type PropsType = {
	totalItemsCount: number,
	pageSize: number,
	currentPageNumber: number,
	onPageChanged: (pageNumber: number) => void,
	portionSize?: number
}

const Paginator: React.FC<PropsType> = ({
	totalItemsCount,
	pageSize,
	currentPageNumber,
	onPageChanged = () => {},
	portionSize = 10
}) => {
	const [portionNumber, setPortionNumber] = useState(1)

	useEffect(() => {
		const newPortionNumber = Math.ceil(currentPageNumber / portionSize)
		if (newPortionNumber !== portionNumber) {
			setPortionNumber(newPortionNumber)
		}
	}, [currentPageNumber, portionSize])

	return (
		<div className={styles.paginator}>

			<Pagination
				current={currentPageNumber}
				total={totalItemsCount}
				pageSize={pageSize}
				onChange={page => onPageChanged(page)}
				showSizeChanger={false}
				style={{marginTop: '20px'}}
			/>
		</div>
	)
}

export default Paginator
