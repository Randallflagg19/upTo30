import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider, useSelector, useDispatch} from 'react-redux'
import {store} from './Redux/store'
import {addPost, changeNewPostText, selectNewPostText, selectPosts} from './Redux/profileSlice'
import {
	addMessage,
	changeNewMessageText,
	selectMessages,
	selectNewMessageText
} from './Redux/messageSlice'
import {selectDialogs} from './Redux/dialogsSlice'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const Main = () => {
	const posts = useSelector(selectPosts)
	const newPostText = useSelector(selectNewPostText)
	const messages = useSelector(selectMessages)
	const newMessageText = useSelector(selectNewMessageText)
	const dialogs = useSelector(selectDialogs)

	const dispatch = useDispatch()

	const addNewPost = () => dispatch(addPost())
	const updateNewPostText = (text: string) => dispatch(changeNewPostText(text))
	const sendMessage = () => dispatch(addMessage())
	const updateNewMessageText = (text: string) => dispatch(changeNewMessageText(text))

	return (
		<App
			posts={posts}
			newPostText={newPostText}
			messages={messages}
			newMessageText={newMessageText}
			dialogs={dialogs}


			changeNewPostText={updateNewPostText}
			addPost={addNewPost}
			changeNewMessageText={updateNewMessageText}
			addMessage={sendMessage}
		/>
	)
}

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
				<Main/>
			</React.StrictMode>
		</BrowserRouter>
	</Provider>
)
