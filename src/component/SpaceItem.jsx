import React from 'react'
import { Link } from 'react-router-dom'
import { store } from '../redux/store'
import { addSpaceToDelete, removeSpaceToDelete, setContextSpace, setSpaceToEdit, setViewFormEditSpace } from '../redux/space/SpaceSlice'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material' 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material'

export default function SpaceItem({space}){

    const spacesToDelete = useSelector(state => state.space.spacesToDelete)

    return (
        <Box sx={{ minWidth: 275, width: '18rem' }} >
            <Card variant='outlined' sx={{ backgroundColor: space.color }}>
                <React.Fragment>
                    <CardContent className="position-relative">
                        <button 
                            style={{ top: '0px', right: '0px' }} 
                            className="position-absolute btn btn-secondary"
                            onClick={()=>{
                                store.dispatch(setViewFormEditSpace(true))
                                store.dispatch(setSpaceToEdit(space))
                                store.dispatch(setContextSpace('edit'))
                            }}
                        >Editer</button>
                        <Checkbox 
                            checked={spacesToDelete.includes(space.id.toString())}
                            onClick={()=>{
                                if(spacesToDelete.includes(space.id.toString())){
                                    store.dispatch(removeSpaceToDelete(space.id.toString()))
                                }else{
                                    store.dispatch(addSpaceToDelete(space.id.toString()))
                                }
                            
                            }}
                        />
                        <Typography variant='h7' component='div' className="text-center mt-3">{space.title}</Typography>
                        
                    </CardContent>
                    <CardActions>
                        <Link to={`/space/${space.id}/tables`}>
                            <Button size="small" color="primary">Tableaux</Button>
                        </Link>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    )

}