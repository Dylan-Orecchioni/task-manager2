import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SpaceItem from './SpaceItem'
import FormEditSpace from './FormEditSpace'
import { deleteTasksByTablesId } from '../redux/task/TaskSlice'
import { deleteSpaces, setContextSpace, setSpaces, setViewFormEditSpace } from '../redux/space/SpaceSlice'
import { deleteTablesBySpacesId } from '../redux/table/TableSlice'
import { store } from '../redux/store'
import Grid from '@mui/material/Unstable_Grid2'
import { Box } from '@mui/material'
import {useNavigate} from 'react-router-dom'

export default function SpaceList(){

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const viewFormEditSpace = useSelector(state => state.space.viewFormEditSpace)
    const spaces = useSelector((state) => state.space.spaces)
    const tables = useSelector((state) => state.table.tables)
    const spacesToDelete = useSelector((state) => state.space.spacesToDelete)


    useEffect(()=>{
        let connected = sessionStorage.getItem('connected') === 'true'
    
        if(!connected){
          return navigate('/login')
        }

        const request = indexedDB.open('task-managerDB', 2)

        request.onsuccess = function(event){

            let db = event.target.result

            const transaction = db.transaction(['space'], 'readonly')
            const spaceStore = transaction.objectStore("space")
            const request2 = spaceStore.getAll()

            request2.onsuccess = function(){
                console.log(request2.result)
                dispatch(setSpaces(request2.result))
            }

        }

    }, [])

    const getTablesToDeleteBySpacesToDelete = (spacesToDelete) => {
        let tablesToDelete = []

        for(let t of tables){
            if(spacesToDelete.includes(t.spaceId)){
                tablesToDelete.push(t.id)
            }
        }
        return tablesToDelete
    }

    return (
        <div className="container mt-3">
            <button className="btn btn-danger" onClick={()=>{
                let tablesToDelete = getTablesToDeleteBySpacesToDelete(spacesToDelete)
                store.dispatch(deleteTasksByTablesId(tablesToDelete))
                store.dispatch(deleteTablesBySpacesId(spacesToDelete))
                store.dispatch(deleteSpaces())

                const request = indexedDB.open('task-managerDB', 2)

                request.onsuccess = function(event){
                    let db = event.target.result

                    const transaction = db.transaction(['space'], 'readwrite')
                    const spaceStore = transaction.objectStore("space")

                    for(let id of spacesToDelete){
                        spaceStore.delete(id)
                    }


                    const transaction2 = db.transaction(['table'], 'readwrite')
                    const tableStore = transaction2.objectStore("table")

                    for(let id of tablesToDelete){
                        tableStore.delete(id)
                    }

                    const transaction3 = db.transaction(['task'], 'readwrite')
                    const taskStore = transaction3.objectStore("task")

                    for(let id of tablesToDelete){
                        taskStore.delete({idTable: id})
                    }

                }

            }}>Supprimer en masse</button>
            <button className="btn btn-success" onClick={()=>{ 
                store.dispatch(setViewFormEditSpace(true))
                store.dispatch(setContextSpace('add'))
             }}>Ajouter</button>
            <Box>
                <Grid container spacing={2}>
                    {spaces.map((space, i) => {
                        return <Grid xs={12} sm={6} md={4} lg={3} key={i}>
                                    <SpaceItem space={space} />
                               </Grid>
                    })}
                </Grid>

                {viewFormEditSpace && <FormEditSpace />}
            </Box>
        </div>
    )

}