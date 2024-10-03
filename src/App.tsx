import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'

import {Route, Routes} from 'react-router-dom'
import {DialogsType, MessagesType, PostsType} from './types'

type AppProps = {
	posts: PostsType
	dialogs: DialogsType
	messages: MessagesType
	addPost: (message: string) => void
};

const App: React.FC<AppProps> = ({posts, dialogs, messages, addPost}) => {
	return (
		<div className="app-wrapper">
			<Header/>
			<Navbar/>
			<div className="app-wrapper-content">
				<Routes>
					<Route path="/dialogs" element={<Dialogs dialogs={dialogs}
					                                         messages={messages}/>}/>
					<Route path="/profile" element={<Profile posts={posts} addPost={addPost}/>}/>
				</Routes>
			</div>
		</div>
	)
}

export default App
