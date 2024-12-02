import React, {Suspense} from 'react'
import {Spin} from 'antd'
import styles from './LazyLoader.module.css'

const LazyLoader: React.FC<{ Component: React.FC }> = ({Component}) => {
	return (
		<Suspense
			fallback={
				<div className={styles.fallbackContainer}>
					<Spin size="large"/>
				</div>
			}
		>
			<Component/>
		</Suspense>
	)
}

export default LazyLoader
