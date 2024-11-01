import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {MessageType} from './../types'
import {RootState} from './store'

type MessagePageState = {
	messages: MessageType[];
	newMessageText: string;
}

const initialState: MessagePageState = {
	messages: [
		{id: 1, message: 'message1'},
		{id: 2, message: 'message2'},
		{id: 3, message: 'message3'},
		{id: 4, message: 'message4'},
		{id: 5, message: 'message5'}
	],
	newMessageText: ''
}

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		changeNewMessageText(state, action: PayloadAction<string>) {
			state.newMessageText = action.payload
		},
		addMessage(state) {
			const newMessage: MessageType = {
				id: state.messages.length + 1,
				message: state.newMessageText
			}
			state.messages = [...state.messages, newMessage]
			state.newMessageText = ''
		}
	}
})

export const selectMessages = (state: RootState) => state.messagePage.messages
export const selectNewMessageText = (state: RootState) => state.messagePage.newMessageText

export const {changeNewMessageText, addMessage} = messageSlice.actions
export const messageReducer = messageSlice.reducer
