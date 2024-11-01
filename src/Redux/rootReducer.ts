import {combineReducers} from '@reduxjs/toolkit'
import {profileReducer} from './profileSlice'
import {messageReducer} from './messageSlice'
import {dialogsReducer} from './dialogsSlice'
import {usersReducer} from './usersSlice'

const rootReducer = combineReducers({
	profilePage: profileReducer,
	messagePage: messageReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer
})

export default rootReducer
