import React, {useState} from 'react'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import { deleteTable, setFormDropTableVisible } from '../redux/table/TableSlice'
import { Box } from '@mui/material' 
import Modal from '@mui/material/Modal';
import {style} from './styleModal'

export default function FormSupTable({tables, open}) {

    const [idTableSelected, setIdTableSelected] = useState('0')

  return (

    <Modal
        open={open}
        onClose={()=>{ store.dispatch( setFormDropTableVisible(false) ) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <form onSubmit={(e)=>{
                    e.preventDefault()
                    if(idTableSelected.toString() === '0'){
                        alert('Veuillez sélectionner un tableau à supprimer.'); return
                    }
                    store.dispatch(deleteTable(idTableSelected))
                    store.dispatch( displayMessage({texte: 'Tableau supprimée avec succès !', typeMessage: 'success'}) )
                    setIdTableSelected('0')
                }}>
                <div className="form-group">
                    <label>Supprimer un tableau</label>
                    <select className="form-control" value={idTableSelected} onChange={(e)=>{
                        setIdTableSelected(e.target.value)
                    }}>
                        <option value={'0'}>---</option>
                        {tables.map((table)=>{
                            return <option key={table.id} value={table.id}>{table.title}</option>
                        })}
                    </select>
                    <div className="form-group">
                        <input type="submit" className="btn btn-danger" value="Supprimer"/>
                    </div>
                </div>
            </form>
        </Box>
    </Modal>

  )
}
