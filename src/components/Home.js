import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo3 from '../imagenes/logo3.png'
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

        setCurrentId('') // Para que el id cambie de nuevo y este en blanco y no haga mas peticiones
      }
    }
    catch (error) {
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
  // Borrar notas 
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
    <div className="bodyNotas">
      <div className="encabezadoHome">
        <div className="logoHome">
          <i className="material-icons">menu</i>
          <img className="imgHome" src={logo3} alt='background' />
        </div>
        <div className="busqueda">
          <div className="contenedorIcono">
            <i className="material-icons iconoInput">search</i>
            <input type="text" className="form-control inputPadding" placeholder="  Búsqueda" />
          </div>
        </div>

        <div className="iconosEnlace">
          <i className="material-icons">autorenew</i>
          <i className="material-icons">person</i>
          <i className="material-icons" onClick={handleLogout}>exit_to_app</i>
          <div className='btnLogout'>
            {/* <button className="btn btn-primary btn-block" onClick={handleLogout} >Cerrar sesión</button> */}
          </div>

        </div>
      </div>
      <div className="bienvenidaMenu">
      <div className='cardHome'>
        {error && <p className='error' >{error}</p>}
        <div className='mssPrincipal'>
          <h1 className='saludo'>Hola</h1>
          <h1 className='usuario'>{currentUser.email}</h1>
        </div>
        <div className="menuForm">
          <div className="burgerMenu">
            <ul>
            <li><i className="material-icons">lightbulb_outline</i><h2>Notas</h2></li>
            <li><i className="material-icons">notifications_none</i><h2>Recordatorios</h2></li>
            <li><i className="material-icons">mode_edit</i><h2>editar</h2></li>
            <li><i className="material-icons">attachment</i><h2>Notas archivadas</h2></li>
            <li><i className="bi bi-trash"></i> <h2>Papelera</h2></li>
            </ul>
          </div>
          </div>

          <div className='col-md-2 ' >
            <form onSubmit={handleSubmit} className="card card-body " {...{ addOrEditNotes, currentId, notas }}>
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
              <div className="iconosHacker">
                <i className="material-icons">color_lens</i>
                <i className="material-icons">add_circle</i>
                <i className="bi bi-pin-fill"></i>
              </div>
            </form>
          </div>
        </div>

        <div className=''>

          {notas.map(nota => (
            <div className='' key={nota.id}>
              <div className='card'>
                <div className="">
                  <h4>{nota.titulo}</h4>
                  <div>
                    <i className="bi bi-x-circle-fill" style={{ cursor: 'pointer' }}
                      onClick={() => onDeleteNote(nota.id)}></i>
                    <i className="bi bi-pen-fill" style={{ cursor: 'pointer' }}
                      onClick={() => setCurrentId(nota.id)}></i>

                  </div>
                </div>
                <p >{nota.description}</p>
              </div>


            </div>

          ))}

        </div>



      </div>
      </div>

    </>
  )
}


export default Home;