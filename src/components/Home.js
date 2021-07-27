import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../imagenes/logo.png'

// import {db} from '../firebase.js'




export const Home = () => {

  

  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const [error, setError] = useState('');


  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      setError('Server Error')
    }



  }
  return (

    <>
      <img className="imgHome" src={logo} alt='background' />

      <div className='cardHome'>
          {error && <p className='error' >{error}</p>}
          <div className='btnLogout'>
            <button className="btn btn-warning" onClick={handleLogout} >Cerrar sesión</button>
      
        </div>

               <div className='mssPrincipal'>
          <h1 className='bienvenida'>Bienvenido/a:</h1>
          <p className='usuario'>{currentUser.email}</p>
        </div>
        
          </div>


    </>
  )
}


export default Home;