import React from 'react'
import Task from './Task'
import { displayFormUpdateTable, moveTable } from '../redux/table/TableSlice'
import { store } from '../redux/store'
import { moveTask } from '../redux/task/TaskSlice'
import { useSelector } from 'react-redux'

export default function Table({table, deletetask}) {

  const tasks = useSelector((state) => state.task.tasks)

  return (
    <div className="table p-2 m-3 rounded"
    draggable="true"
      onDragStart={(e)=>{
        e.dataTransfer.setData('id_table_drag', table.id)
        e.dataTransfer.setData('order_table_drag', table.order)
      }}
      onDrop={(e)=>{
        let id_task = e.dataTransfer.getData('id_task')
        let id_table_drag = e.dataTransfer.getData('id_table_drag')
        const order_table_drag = e.dataTransfer.getData('order_table_drag')
        console.log(id_task)
        if(id_task){
          // J'ai droppé une tâche
          store.dispatch( moveTask({id_task, id_table_drop: table.id}) )
        }else if(id_table_drag){
          // J'ai droppé un tableau
          store.dispatch(moveTable({id_table_drag: id_table_drag, order_table_drag: order_table_drag, id_table_drop : table.id, order_table_drop: table.order}))
        }
        
      }}
      onDragOver={(e)=>{
        e.preventDefault()
      }}
      onClick={()=>{
        console.log(table)
        store.dispatch( displayFormUpdateTable(table) )
      }}
    >
        <p>{table.title}</p>
        {tasks.map((task)=>{
            if(table.id.toString() === task.tableId.toString()){
                return <Task key={task.id} task={task} />
            }
        })}
    </div>
  )
}
