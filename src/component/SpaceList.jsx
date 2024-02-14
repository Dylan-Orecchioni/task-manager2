import React, {useEffect, useState} from 'react'
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
import axios from 'axios'

export default function SpaceList(){
    
    const viewFormEditSpace = useSelector(state => state.space.viewFormEditSpace)
    const tables = useSelector((state) => state.table.tables)
    const spacesToDelete = useSelector((state) => state.space.spacesToDelete)
    const [spacesAxios, setSpacesAxios] = useState([])

    const firebaseConfig = {
        VITE_API_KEY: import.meta.env.VITE_API_KEY,
        VITE_AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
        VITE_PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
        VITE_STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET,
        VITE_MESSAGING_SENDER: import.meta.env.VITE_MESSAGING_SENDER,
        VITE_APP_ID: import.meta.env.VITE_APP_ID
    };

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://firestore.googleapis.com/v1/projects/' + firebaseConfig.VITE_PROJECT_ID + '/databases/(default)/documents/space?key=' + firebaseConfig.VITE_API_KEY,
            responseType: 'json',
        })
        .then((response)=>{
            setSpacesAxios(response.data.documents)
        })
        .catch((error)=>{
            console.log(error)
        })
    })

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
                    {spacesAxios.map((space, i) => {
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