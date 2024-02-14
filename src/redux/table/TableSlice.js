import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { deleteTableIDB, updateTableIDB } from '../../utils/TableServices'

const initialState = {
    tables: [
        {
            id: '1',
            title: 'Projet ressource',
            order: 1,
            spaceId: '1'
        },
        {
            id: '2',
            title: 'Sujet de la prochaine réunion',
            order: 2,
            spaceId: '1'
        },
        {
            id: '3',
            title: 'A faire',
            order: 3,
            spaceId: '2'
        },
        {
            id: '4',
            title: 'En cours',
            order: 4,
            spaceId: '2'
        }
    ],
    formAddTableVisible: false,
    formDropTableVisible: false,
    tableToEdit: null
}

export const TableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    reducers: {
        setTables: (state, actions) => {
            state.tables = actions.payload
        },
        moveTable: (state, action) => {
            
            let id_table_drag = action.payload.id_table_drag
            let order_table_drag = action.payload.order_table_drag
            let id_table_drop = action.payload.id_table_drop
            let order_table_drop = action.payload.order_table_drop

            let newTables = [...tables]
    
            for(let table of newTables){
            
                // Si l'order du tableau de drop est suppérieur à l'order du tableau de drag
    
                if(Number(order_table_drop > Number(order_table_drag))){
                    // le tableau qui a l'id id_table_drag prend le order order_table_drop
                    // Les tableaux d'order inférieur à order_table_drop et supérieur à order_table_drag on leur order qui se décrémente de 1
                    if(table.id.toString() === id_table_drag.toString()){
                        table.order = Number(order_table_drop)
                    }else if(table.id.toString() === id_table_drop.toString()){
                        table.order = table.order - 1
                        // On décale à gauche les tableaux situés à gauche du tableau de drop
                    }else if(Number(table.order) < Number(order_table_drop) && Number(table.order) > Number(order_table_drag)){
                        table.order = table.order - 1
                    }
                    // Si l'order du tableau de drop est inférieur à l'order du tableau de drag          
                }else if(Number(order_table_drop < Number(order_table_drag))){
                    // le tableau qui a l'id id_table_drag prend le order order_table_drop
                    // Les tableaux d'order suppérieur à order_table_drop et inférieur à order_table_drag on leur order qui s'incrémente de 1
                    if(table.id.toString() === id_table_drag.toString()){
                        table.order = Number(order_table_drop)
                    }else if(table.id.toString() === id_table_drop.toString()){
                        table.order = table.order + 1
                        // On décale à droite les tableaux situés à droite du tableau de drop
                    }else if(Number(table.order) > Number(order_table_drop) && Number(table.order) < Number(order_table_drag)){
                        table.order = table.order + 1
                    }  
                }
    
            }
    
            state.tables = newTables
        },
    
        addTable: (state, action) => {
            let title = action.payload.title
            let spaceId = action.payload.spaceId
            const newTable = {
                id: uuidv4(),
                title: title,
                spaceId: spaceId
            }
    
            updateTableIDB(newTable)

            state.tables = [...state.tables, newTable]
            state.formAddTableVisible = false
            state.tableToEdit = null
        },
        deleteTable: (state, action) => {
            let id = action.payload
            let newTables = [...state.tables].filter((tab) => tab.id.toString() !== id.toString())
            localStorage.setItem('tables', JSON.stringify(newTables))
            state.tables = newTables
            deleteTableIDB(id)
        },
        updateTable: (state, action) => {
            let tableTitle = action.payload.tableTitle
            let id_table = action.payload.id_table

            let newTables = [...state.tables]
            let index = newTables.findIndex(t => t.id === id_table)
            newTables[index].title = tableTitle
            state.tables = newTables
            state.formAddTableVisible = false
            state.tableToEdit = null 
        },
        hideFormUpdateTable: (state) => {
            state.formAddTableVisible = false
            state.tableToEdit = null
        },
        setFormDropTableVisible: (state, action) => {
            state.formDropTableVisible = action.payload
        },
        displayFormUpdateTable: (state, action) => {
            state.tableToEdit = action.payload
            state.formAddTableVisible = true
        },
        displayFormAddTable: (state, action) => {
            state.formAddTableVisible = true
        },
        deleteTablesBySpacesId: (state, action) => {
            state.tables = state.tables.filter(table => !action.payload.includes(table.spaceId))
        },
    }
})

export const {
    setTables,
    moveTable,
    addTable,
    deleteTable,
    updateTable,
    hideFormUpdateTable,
    setFormDropTableVisible,
    displayFormUpdateTable,
    displayFormAddTable,
    deleteTablesBySpacesId
} = TableSlice.actions

export default TableSlice.reducer

