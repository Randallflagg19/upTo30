import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import {Route, Routes} from 'react-router-dom'
import {DialogsType, MessagesType, PostsType} from './types'
import {Button, Flex, Layout, Menu} from 'antd'
//35-36
const {Content, Footer} = Layout
type AppProps = {
	posts: PostsType
	newPostText: string
	dialogs: DialogsType
	messages: MessagesType
	addPost: () => void
	changeNewPostText: (newPostText: string) => void
	newMessageText: string
	changeNewMessageText: (newMessageText: string) => void
	addMessage: () => void
};

const items = new Array(3).fill(null).map((_, index) => ({
	key: index + 1,
	label: `nav ${index + 1}`
}))

const App: React.FC<AppProps> = ({
	newMessageText,
	changeNewPostText, posts, dialogs
	, changeNewMessageText, messages, addPost, newPostText, addMessage
}) => {
	return (
		<Layout>
			<div className="app-wrapper">
				<Header/>
				<Navbar/>
				<Content>
					<div className="app-wrapper-content">
						<Routes>
							<Route path="/dialogs" element={<Dialogs
								dialogs={dialogs} addMessage={addMessage}
								messages={messages}
								changeNewMessageText={changeNewMessageText}
								newMessageText={newMessageText}/>}/>
							<Route path="/profile" element={<Profile
								posts={posts} addPost={addPost}
								newPostText={newPostText}
								changeNewPostText={changeNewPostText}/>}/>
						</Routes>
					</div>
				</Content>
			</div>
			<Footer></Footer>
		</Layout>
	)
}

export default App
