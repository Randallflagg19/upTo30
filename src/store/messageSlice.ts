import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {MessageType} from './../types'
import {RootState} from './store'

type MessagePageState = {
	messages: MessageType[];
}

const initialState: MessagePageState = {
	messages: [
		{id: 1, message: 'message1'},
		{id: 2, message: 'message2'},
		{id: 3, message: 'message3'},
		{id: 4, message: 'message4'},
		{id: 5, message: 'message5'}
	]
}

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		addMessage(state, action: PayloadAction<string>) {
			const newMessage: MessageType = {
				id: state.messages.length + 1,
				message: action.payload
			}
			state.messages = [...state.messages, newMessage]
		}
	}
})

export const selectMessages = (state: RootState) => state.messagePage.messages

export const {addMessage} = messageSlice.actions
export const messageReducer = messageSlice.reducer
