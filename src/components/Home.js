import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../imagenes/logo.png'
import { db } from '../firebase.js'



export const Home = () => {


  const initialStateValues = {
    titulo: '',
    description: ''
  }
  // Definiendo el estado
  const [values, setValues] = useState(initialStateValues)

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value });
  }

  const addOrEditNotes = async (noteObject) => {

    try {
    // console.log (noteObject)
    if (currentId === '') {
      await db.collection('Notas').doc().set(noteObject)
      // console.log('Una tarea nueva agregada')
    } else {// si si tiene el id seleccionado
      await db.collection('Notas').doc(currentId).update(noteObject);
  
    setCurrentId ('') // Para que el id cambie de nuevo y este en blanco y no haga mas peticiones
  }
  }
catch (error){
  console.error(error);
}
  }


  const handleSubmit = e => {
    e.preventDefault();
    // console.log(values)
    addOrEditNotes(values);
    setValues({ ...initialStateValues })
  }



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

  const onDeleteNote = async (id) => {
    // console.log(id);
    if (window.confirm('¿Estás seguro que quieres eliminar esta nota?')) {
      // console.log(id)
      await db.collection('Notas').doc(id).delete();
      console.log('tarea eliminada')
    }
  };

  const [currentId, setCurrentId] = useState('');
  const [notas, setNotas] = useState([]);

  const getNotes = () => {
    db.collection('Notas').onSnapshot((querySnapshop) => {
      const docs = [];
      querySnapshop.forEach(doc => {
        // console.log(doc.data())
        // console.log(doc.id)
        docs.push({ ...doc.data(), id: doc.id })

      });
      // console.log(docs)
      setNotas(docs)
    });
  };
  // useEffect para obtener datos
  useEffect(() => {
    // console.log('Obtener datos...')

    getNotes();
  }, [])


  const getNoteById = async (id) => {
    const doc = await db.collection('Notas').doc(id).get();
    setValues({ ...doc.data() })// Estableciendo los valores del formulario para editar

  }
  //UseEffect para editar
  useEffect(() => {
    if (currentId === '') {
      setValues({ ...initialStateValues })
    } else {
      getNoteById(currentId)
    }

  }, [currentId])

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

        <div className='col-md-14 p-2' >
          <form onSubmit={handleSubmit} className="card card-body border-primary" {...{ addOrEditNotes, currentId, notas }}>
            <div className="form-group input-group">
              <div className="input-group-text bg-light">
                <i className="material-icons">create</i>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Título de la Nota"
                name="titulo"
                onChange={handleInputChange}
                value={values.titulo}

              />
            </div>
            <br />
            <div className="form-group">
              <textarea
                rows="3"
                className="form-control"
                placeholder="Descripción"
                name="description"
                onChange={handleInputChange}
                value={values.description}

              ></textarea>
            </div>
            <br />
            <button className="btn btn-primary btn-block">
              {currentId === '' ? ' Crear nota' : 'Actualizar'}
            </button>

          </form>
        </div>

        <div className='col-md-16 p-2'>

          {notas.map(nota => (
            <div className='card mb-1' key={nota.id}>
              <div className='card-body'>
                <div className="d-flex justify-content-between">
                  <h4>{nota.titulo}</h4>
                  <div>
                    <i className='material-icons text-danger'
                      onClick={() => onDeleteNote(nota.id)}>close</i>
                    <i className='material-icons'
                      onClick={() => setCurrentId(nota.id)}>create</i>
                  </div>
                </div>
                <p >{nota.description}</p>
              </div>


            </div>

          ))}

        </div>



      </div>


    </>
  )
}


export default Home;