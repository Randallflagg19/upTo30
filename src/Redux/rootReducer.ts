import {combineReducers} from '@reduxjs/toolkit'
import {profileReducer} from './profileSlice'
import {messageReducer} from './messageSlice'
import {dialogsReducer} from './dialogsSlice'

const rootReducer = combineReducers({
	profilePage: profileReducer,
	messagePage: messageReducer,
	dialogsPage: dialogsReducer
})

export default rootReducer
