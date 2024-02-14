import React from 'react'
import { hideMessage } from '../redux/message/MessageSlice'
import { useSelector } from 'react-redux'
import { store } from '../redux/store'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Message(){

    const texte = useSelector((state) => state.message.texte)
    const typeMessage = useSelector((state) => state.message.typeMessage)
    const viewMessage = useSelector((state) => state.message.viewMessage)

    return (

        <Snackbar open={viewMessage} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={3000} onClose={() =>{ store.dispatch( hideMessage()) }}>
            <Alert
                severity={typeMessage}
                variant="filled"
                sx={{ width: '100%' }}
                onClose={() =>{ store.dispatch( hideMessage()) }}
            >
                {texte}
            </Alert>
        </Snackbar>
    )

}