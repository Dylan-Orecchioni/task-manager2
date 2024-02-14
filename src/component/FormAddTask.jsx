import React,{useState} from 'react'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import { addTask, hideFormUpdateTask, updateTask } from '../redux/task/TaskSlice'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material' 
import Modal from '@mui/material/Modal';
import {style} from './styleModal'
import { updateTaskIDB } from '../utils/TaskServices'

export default function FormAddTask({tables, context, open}) {

    const taskToEdit = useSelector((state) => state.task.taskToEdit)

    const [tableId, setTableId] = useState(0)
    const [taskContent, setTaskContent] = useState(context === 'edit' ? taskToEdit.content : '')

    
  return (

    <Modal
        open={open}
        onClose={()=>{ store.dispatch(hideFormUpdateTask())  }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        <form onSubmit={(e)=>{
                e.preventDefault()
                
                if( context === 'add' && tableId.toString() === '0'){
                    alert('Veuillez choisir un tableau pour votre tâche.'); return
                }

                if(context === 'add'){
                    store.dispatch(addTask({taskContent, tableId}))
                    store.dispatch( displayMessage({texte: 'Tâche ajouté avec succès !', typeMessage: 'success'}) )
                }else{
                    store.dispatch( updateTask({taskContent, id_task: taskToEdit.id}) )
                    updateTaskIDB({
                        id: taskToEdit.id,
                        content: taskContent,
                        tableId
                    })
                    store.dispatch( displayMessage({texte: 'Tâche modifiée avec succès !', typeMessage: 'success'}) )
                }
                
                setTaskContent('')
                setTableId(0)
            }}>
            <div className="form-group">
                    {context === 'add' && 
                    <select className="form-control" value={tableId} onChange={(e)=>{
                        setTableId(e.target.value)
                    }}>
                        <option value={0}>---</option>
                        {tables.map((table)=>{
                            return <option key={table.id} value={table.id}>{table.title}</option>
                        })}
                    </select>}
            </div>
            <div className="form-group">
                <label>Tâche</label>
                <input type="text" className='form-control' value={taskContent} onChange={(e)=>{
                    setTaskContent(e.target.value)
                }} />
                <input type="submit" className='btn btn-success' value={context === 'edit' ? 'Modifier la tâche' : "Ajouter une tâche"} /> 
            </div>
        </form>
    </Box>
    </Modal>
  )
}
