import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {store} from './store'
import {StateType} from './types'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

export const rerenderTree = (state: StateType) => {
	root.render(
		<BrowserRouter>
			<React.StrictMode>
				<App
					posts={state.profilePage.posts}
					newPostText={state.profilePage.newPostText}
					messages={state.messagePage.messages}
					newMessageText={state.messagePage.newMessageText}
					dialogs={state.profilePage.dialogs}
					changeNewPostText={store.changeNewPostText}
					addPost={store.addPost}
					changeNewMessageText={store.changeNewMessageText}
					addMessage={store.addMessage}
				/>
			</React.StrictMode>
		</BrowserRouter>
	)
}

rerenderTree(store.state)

store.subscribe(rerenderTree)
