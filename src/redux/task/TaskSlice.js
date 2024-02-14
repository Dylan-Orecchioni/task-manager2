import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { deleteTaskIDB, updateTaskIDB } from '../../utils/TaskServices'

const initialState = {
    tasks: [
        {
            id: '1',
            content: 'Faire le header',
            tableId: '1'
        },
        {
            id: '2',
            content: 'Faire le footer',
            tableId: '2'
        }
    ],
    formAddTaskVisible: false,
    taskToEdit: null
}

export const TaskSlice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },

        addTask: (state, action) => {
            let taskContent = action.payload.taskContent
            let tableId = action.payload.tableId


                let newTask = {
                    id: uuidv4(),
                    content: taskContent,
                    tableId
                }
    
                state.tasks.push(newTask)
    
                updateTaskIDB(newTask)

                state.formAddTaskVisible = false
                state.taskToEdit = null
        },
        deletetask: (state, action) => {
            let id_task = action.payload
            let index = state.tasks.findIndex(t => t.id.toString() === id_task.toString())
            state.tasks.splice(index, 1)
            deleteTaskIDB(id_task)
        },
        moveTask: (state, action) => {
            let index = state.tasks.findIndex(t => t.id === action.payload.id_task)
            state.tasks[index].tableId = action.payload.id_table_drop
        },
        displayFormUpdateTask: (state, action) => {
            let task = action.payload
            state.formAddTaskVisible = true
            state.taskToEdit = task
        },
        hideFormUpdateTask: (state) => {
            state.formAddTaskVisible = false
            state.taskToEdit = null
        },
        updateTask: (state, action) => {
            let taskContent = action.payload.taskContent
            let id_task = action.payload.id_task

            let index = state.tasks.findIndex(task => task.id === id_task)
            state.tasks[index].content = taskContent

            state.formAddTaskVisible = false
            state.taskToEdit = null
        },
        setFormAddTaskVisible: (state, action) => {
            state.formAddTaskVisible = action.payload
        },
        deleteTasksByTablesId: (state, action) => {
            state.tasks = state.tasks.filter(task => !action.payload.includes(task.tableId))
        },

    }
})

export const {
    setTasks,
    addTask,
    deletetask,
    moveTask,
    displayFormUpdateTask,
    hideFormUpdateTask,
    updateTask,
    deleteTasksByTablesId,
    setFormAddTaskVisible
} = TaskSlice.actions

export default TaskSlice.reducer

