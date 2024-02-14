import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { Box } from '@mui/material' 
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export default function HomePage() {

  const navigate = useNavigate()
  const spaces = useSelector((state)=> state.space.spaces)
  const tables = useSelector((state)=> state.table.tables)
  const tasks = useSelector((state)=> state.task.tasks)

  useEffect(()=>{
    let connected = sessionStorage.getItem('connected') === 'true'

    if(!connected){
      return navigate('/login')
    }
  }, [])



  let data = [{
    title: "Nombre d'espaces",
    value: spaces.length
  },
  {
    title: "Nombre de Tableaux",
    value: tables.length
  },
  {
    title: "Nombre de tâches",
    value: tasks.length
  }
]

  return (
    <>
        <Link to="/login" className='btn btn-danger'>Déconnexion</Link>    
        <Link to="/spaces" className='btn btn-success'>Liste des espaces</Link>

        <div className="container mt-3">
            <h1 className="text-center text-color-website">Page d'accueil</h1>
            <Grid container spacing={7} className="mt-5">
            {
              data.map((d, i)=>{
                return <Grid key={i} xs={6} md={4}>
                        <Box >
                          <Card variant="outlined" sx={{minHeight: "190px", backgroundColor: '#ffffff75'}}>
                              <React.Fragment>
                                <CardContent>
                                    <Typography variant="h4" component="div" className="text-center text-color-website">
                                      {d.title}
                                    </Typography>
                                    <Typography variant="h4" component="div" className="text-center mt-4 text-color-website">
                                      {d.value}
                                    </Typography>
                                </CardContent>
                              </React.Fragment>
                          </Card>
                        </Box>
                      </Grid>
              })
            }


            </Grid>

        </div>
    </>
  )
}
