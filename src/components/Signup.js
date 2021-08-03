import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DevNotes from '../imagenes/DevNotes.png'
import gmailLogo from '../imagenes/gmailLogo.png';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import firebase from 'firebase';



export const SignUp = () => {
  const { signup } = useAuth();

  const [error, setError] = useState('');
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmName, setConfirmName] = useState('');


  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleConfirmName = e => setConfirmName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && confirmName === true) {
      setError('Debe llenar todos los campos');
      setTimeout(() => setError(''), 1500);
    } else {
      try {
        await signup(email, password);
        history.push('/Notes');
      } catch (error) {
        setError('Credenciales inválidas');
        setTimeout(() => setError(''), 1500);
      }
    }
 
  }
  const handleAuth = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider)

    try {
      history.push('/Notes');
    } catch (err) {
      setError('Credenciales inválidas');
      setTimeout(() => setError(''), 1500);
    }
  }

  return (

    <>
    <img className="imgLogin" src={DevNotes} alt='background' />
    <div className='contenedorLogo'>
    </div>

    <div className='card'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}
        <h1 className='mensaje'>Regístrate</h1>
      </div>
      <div className='card-body'>
        <form className="card card-body" onSubmit={handleSubmit} >

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
                    required
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
                    required
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">perm_identity</i>
                </div>
                <input
                    type="text"
                    className="form-control "
                    placeholder="Nombre de usuario"
                    name="nombre"
                    onChange={handleConfirmName}
                    required
                />
            </div>
    
            <button type='submit'className="btn btn-primary btn-block">
            Registrarme
            </button>
        
            <button className="btnGoogle" onClick={handleAuth}> <img className="loginGmail"src={gmailLogo} alt='gmail' /></button>
          <p className='mensGmail'>Inicia sesión con Gmail </p>
        </form>
      
        <p className= 'linkMess'>¿Ya tienes cuenta? <Link to='/login'>Iniciar sesión</Link> </p>
      </div>

    </div>
    </>
  )
}