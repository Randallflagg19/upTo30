import './index.css'
import {state} from './state'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {addMessage, addPost, changeNewMessageText, changeNewPostText} from './state'
import {subscribe} from './state'
import {StateType} from './types'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
export const rerenderTree = (state: StateType) => {
	root.render(<BrowserRouter>
			<React.StrictMode>
				<App
					posts={state.profilePage.posts}
					newPostText={state.profilePage.newPostText}
					dialogs={state.profilePage.dialogs}
					messages={state.messagePage.messages}
					newMessageText={state.messagePage.newMessageText}
					changeNewMessageText={changeNewMessageText}
					addMessage={addMessage}
					changeNewPostText={changeNewPostText}
					addPost={addPost}
				/>
			</React.StrictMode>
		</BrowserRouter>
	)
}

rerenderTree(state)

subscribe(rerenderTree)

