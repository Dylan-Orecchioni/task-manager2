import React, {useState} from 'react'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import { addTable, hideFormUpdateTable, updateTable } from '../redux/table/TableSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material' 
import Modal from '@mui/material/Modal';
import {style} from './styleModal'
import { updateTableIDB } from '../utils/TableServices'
import { addTablesAPI } from '../api/TableAPI'

export default function FormAddTable({context, open}) {

    const { id } = useParams()
    const tableToEdit = useSelector((state) => state.table.tableToEdit)
    const tables = useSelector((state) => state.table.tables)
    const [title, setTitle] = useState(context === 'edit' && tableToEdit !== null ? tableToEdit.title : '')

    const getOrderNewtable = (id) => {
        let ts = []

        for(let t of tables){
            if(t.spaceId === id){
                ts.push(t)
            }
        }
        return ts.length + 1
    }

  return (
    <Modal
        open={open}
        onClose={()=>{ store.dispatch(hideFormUpdateTable()) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <form onSubmit={async (e)=>{
                e.preventDefault()
                if(title.trim().length === 0){
                    alert("Veuillez saisir un titre au tableau."); return
                }
                if(context === 'add'){
                    let newTableId = await addTablesAPI(title, id, getOrderNewtable(id))
                    store.dispatch(addTable({id: newTableId, title, spaceId: id}))
                    store.dispatch( displayMessage({texte: 'Tableau ajouté avec succès !', typeMessage: 'success'}) )
                }else{
                    let newTable = {tableTitle: title, id_table: tableToEdit.id}
                    store.dispatch(updateTable(newTable))
                    updateTableIDB({
                        id: tableToEdit.id,
                        title: title,
                        spaceId: tableToEdit.spaceId
                    })
                    store.dispatch( displayMessage({texte: 'Tableau modifié avec succès !', typeMessage: 'success'}) )
                }
                setTitle('')
            }}
            >
                <div className="form-group">
                    <label>Ajouter un tableau</label>
                    <input type="text" className="form-control" value={title} onChange={(e)=>{ setTitle(e.target.value) }} />
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value={context === 'edit' ? 'Modifier' : "Ajouter"}/>
                </div>
            </form> 
        </Box>
      </Modal>
  )
}
