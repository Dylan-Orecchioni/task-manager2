import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    viewMessage: false,
    texte: '',
    typeMessage: ''
}

export const MessageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        displayMessage: (state, action) => {
            state.viewMessage = true
            state.texte = action.payload.texte
            state.typeMessage = action.payload.typeMessage
        },
        hideMessage: (state) => {
            state.viewMessage = false
            state.texte = ''
            state.typeMessage = ''
        }
    }
})

export const {
    displayMessage,
    hideMessage
} = MessageSlice.actions

export default MessageSlice.reducer

