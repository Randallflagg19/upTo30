import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import {Route, Routes, useLocation} from 'react-router-dom'
import {DialogsType, MessagesType, PostsType} from './types'
import {Layout} from 'antd'
import Dialogs from './components/Dialogs/Dialogs'
import Translator from './components/Translator/Translator'

const {Content} = Layout

type AppProps = {
	posts: PostsType;
	newPostText: string;
	dialogs: DialogsType;
	messages: MessagesType;
	addPost: () => void;
	changeNewPostText: (newPostText: string) => void;
	newMessageText: string;
	changeNewMessageText: (newMessageText: string) => void;
	addMessage: () => void;
};

const App: React.FC<AppProps> = ({
	newMessageText,
	changeNewPostText,
	posts,
	dialogs,
	changeNewMessageText,
	messages,
	addPost,
	newPostText,
	addMessage
}) => {
	const location = useLocation()

	return (
		<Layout>
			<div className="app-wrapper">
				<Header/>
				{location.pathname.startsWith('/sn') && <Navbar/>}
				<Content>
					<div className="app-wrapper-content">
						<Routes>
							<Route path="/sn/dialogs" element={<Dialogs
								dialogs={dialogs}
								addMessage={addMessage}
								messages={messages}
								changeNewMessageText={changeNewMessageText}
								newMessageText={newMessageText}
							/>}/>
							<Route path="/sn/profile" element={<Profile
								posts={posts}
								addPost={addPost}
								newPostText={newPostText}
								changeNewPostText={changeNewPostText}
							/>}/>
							<Route path="/translator" element={<Translator/>}/>
						</Routes>
					</div>
				</Content>
			</div>
		</Layout>
	)
}

export default App
