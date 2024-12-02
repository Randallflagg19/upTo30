import {combineReducers} from '@reduxjs/toolkit'
import {profileReducer} from './profileSlice'
import {messageReducer} from './messageSlice'
import {dialogsReducer} from './dialogsSlice'
import {usersReducer} from './usersSlice'
import {authReducer} from './authSlice'
import {appReducer} from './appSlice'

const rootReducer = combineReducers({
	profilePage: profileReducer,
	messagePage: messageReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer
})

type RootReducerType = typeof rootReducer
type AppStateType = ReturnType<RootReducerType>

export default rootReducer
