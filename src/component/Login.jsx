import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {

    if(sessionStorage.getItem('connected') === 'true') {
      return navigate('/')
    }

  }, [])

  return (
    <div className="container">
      <form onSubmit={(e)=>{
        e.preventDefault()

        if(email.trim().length === 0 || password.trim().length === 0){
          alert('Veuillez saisir un email et un mot de passe.'); return
        }

        if(email === 'contact@cloudcampus.fr' && password === '0000'){
          sessionStorage.setItem('connected', true)
          return navigate('/')
        }
        alert('Identifiants ou mot de passe incorrect')
      }}>

        <div className='mb-3 form-group'>
                  <label>Login</label>
                  <input type="text" className="form-control" value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                  }} />
        </div>

        <div className='mb-3 form-group'>
                  <label>Mot de passe</label>
                  <input type="password" className="form-control" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                  }} />
        </div>
        <input className='btn btn-primary ' type="submit" value="Connexion" />

      </form>      
    </div>
  )
}
