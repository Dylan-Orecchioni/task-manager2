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
import { deleteSpacesAPI, getSpaces } from '../api/SpaceAPI'

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

        const fetchSpaces = async () => {
            let spaces = await getSpaces()
            dispatch(setSpaces(spaces))
        }

        fetchSpaces()

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

    const handleDeleteSpaces = async () => {
        let tablesToDelete = getTablesToDeleteBySpacesToDelete(spacesToDelete)
        for(let id of spacesToDelete){
            await deleteSpacesAPI(id)
        }
        store.dispatch(deleteTasksByTablesId(tablesToDelete))
        store.dispatch(deleteTablesBySpacesId(spacesToDelete))
        store.dispatch(deleteSpaces())
    }

    return (
        <div className="container mt-3">
            <button className="btn btn-danger" onClick={handleDeleteSpaces}>Supprimer en masse</button>
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