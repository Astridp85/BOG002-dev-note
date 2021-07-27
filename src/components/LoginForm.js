import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../imagenes/logo.png'
import gmailLogo from '../imagenes/gmailLogo.png'
import { useAuth } from '../context/AuthContext';



export const Login = () => {

  const { login } = useAuth();
  const [error, setError] = useState('');

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      await login(email, password);
     
      history.push('/');
    } catch (error) {

      setError('Credenciales inválidas');
      setTimeout(() => setError(''), 1500);
    }
  }


  return (
<>
    <img className="imgLogin" src={logo} alt='background' />
    <div className='contenedorLogo'>
    </div>
    <div className='card'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}
        
        <h1 className='mensaje'>Inicia sesión</h1>
      </div>
      <div className='card-body'>
        <form className='card card-body'onSubmit={handleSubmit}>

        <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">mail</i>
                </div>
                <input
                    type="email"
                    className="form-control "
                    placeholder="Correo electrónico"
                    name="correo"
                    onChange={handleEmail}
                />
            </div>




            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    type="password"
                    className="form-control "
                    placeholder="Contraseña"
                    name="identificacion"
                    onChange={handlePassword}
                />
            </div>


            <button className="btn btn-primary btn-block">
                Iniciar sesión
            </button>
            <img className="loginGmail" src={gmailLogo} alt='gmail' />
        </form>
        <p className='linkMess'>¿No tienes una cuentra? <Link to='/Signup'>Regístrate</Link> </p>
    
      </div>

    </div>
    
    </>
  )
}