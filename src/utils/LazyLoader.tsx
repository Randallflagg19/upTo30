import React, {Suspense} from 'react'
import {Spin} from 'antd'

const LazyLoader: React.FC<{ Component: React.FC }> = ({Component}) => {
	return (
		<Suspense
			fallback={
				<div
					style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
					<Spin size="large"/>
				</div>
			}
		>
			<Component/>
		</Suspense>
	)
}

export default LazyLoader
