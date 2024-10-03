import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {addPost} from './state'
import {StateType} from './types'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
export const rerenderTree = (state: StateType) => {
	root.render(<BrowserRouter>
			<React.StrictMode>
				<App posts={state.profilePage.posts}
				     dialogs={state.profilePage.dialogs}
				     messages={state.messagePage.messages}
				     addPost={addPost}
				/>
			</React.StrictMode>
		</BrowserRouter>
	)
}

