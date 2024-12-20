import {createSlice} from '@reduxjs/toolkit'
import {RootState} from './store'
import {DialogType} from '../types'

const initialState = {
	dialogs: [
		{id: 1, name: 'name1'},
		{id: 2, name: 'name2'},
		{id: 3, name: 'name3'},
		{id: 4, name: 'name4'},
		{id: 5, name: 'name5'},
		{id: 6, name: 'name6'}
	] as Array<DialogType>
}

const dialogsSlice = createSlice({
	name: 'dialogs',
	initialState,
	reducers: {}
})
export const selectDialogs = (state: RootState) => state.dialogsPage.dialogs
export const dialogsReducer = dialogsSlice.reducer
