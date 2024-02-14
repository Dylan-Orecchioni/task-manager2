import React, {useState, useEffect } from 'react'
import Table from './Table'
import FormAddTable from './FormAddTable'
import FormSupTable from './FormSupTable'
import FormAddTask from './FormAddTask'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {produce} from 'immer'
import { displayFormAddTable, setFormDropTableVisible, setTables } from '../redux/table/TableSlice'
import { useSelector } from 'react-redux'
import { store } from '../redux/store'
import { setFormAddTaskVisible, setTasks } from '../redux/task/TaskSlice'

export default function Tables() {

    const {id} = useParams()

    const navigate = useNavigate()

    const tables = useSelector((state) => state.table.tables)
    const formAddTableVisible = useSelector((state) => state.table.formAddTableVisible)
    const formDropTableVisible = useSelector((state) => state.table.formDropTableVisible)
    const tableToEdit = useSelector((state) => state.table.tableToEdit)
    const taskToEdit = useSelector((state) => state.task.taskToEdit)

    const formAddTaskVisible = useSelector((state) => state.task.formAddTaskVisible)

    
    useEffect(()=>{
        let connected = sessionStorage.getItem('connected') === 'true'
    
        if(!connected){
          return navigate('/login')
        }

        let tablesStorage = localStorage.getItem('tables')

        if(tablesStorage !== null && tablesStorage !== ''){
            let data = JSON.parse(tablesStorage)
            store.dispatch(setTables(data))
        }
    }, [])

    const filterTables = (id_space, tables) => {
        return [...tables].filter(table => table.spaceId.toString() === id_space.toString())
    }

    let tablesFiltered = filterTables(id, tables)

  return (
    <div className="container">
        <Link to="/" className="btn btn-primary">page d'accueil</Link>
        <div className="d-flex">
        <button className="btn btn-success" onClick={()=>{ store.dispatch(displayFormAddTable()) }}>Ajouter un tableau</button>
        <button className="btn btn-danger" onClick={()=>{ store.dispatch(setFormDropTableVisible(true)) }}>Supprimer un tableau</button>
        <button className="btn btn-primary" onClick={()=>{ store.dispatch(setFormAddTaskVisible(true)) }}>Ajouter une tâche</button>
            <FormAddTable context={tableToEdit === null ? 'add' : 'edit'} open={formAddTableVisible} />
            <FormSupTable tables={tables} open={formDropTableVisible} />
            <FormAddTask tables={tables} context={taskToEdit === null ? 'add' : 'edit'} open={formAddTaskVisible} />
        </div>
        <div className="d-flex justify-content-start align-items-start">
            {tablesFiltered.sort((a, b)=> ( a.order > b.order ? 1 : -1 )).map((table, index)=>{
                return <Table key={index} table={table} />
            })}
        </div>
    </div>
  )
}
