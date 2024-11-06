import {combineReducers} from '@reduxjs/toolkit'
import {profileReducer} from './profileSlice'
import {messageReducer} from './messageSlice'
import {dialogsReducer} from './dialogsSlice'
import {usersReducer} from './usersSlice'
import {authReducer} from './authSlice'

const rootReducer = combineReducers({
	profilePage: profileReducer,
	messagePage: messageReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer
})

export default rootReducer
