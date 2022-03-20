import React from 'react';
import shortid from 'shortid'

function App() {

  const [tarea, settarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setmodoEdicion] = React.useState(false)
  const [id, setid] = React.useState('')
  const [error, seterror] = React.useState(null)

  const agregarTarea = e => {
    e.preventDefault()

    if (!tarea.trim()) {
      console.log('Elemento Vacio')
      seterror('Escriba algo por favor')
      return
    }
    console.log(tarea)
    setTareas([
      ...tareas, { id: shortid.generate(), Nombretarea: tarea }
    ])
    settarea('')
    seterror(null)

  }

  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item => {
    setmodoEdicion(true)
    settarea(item.Nombretarea)
    setid(item.id)

  }

  const editarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Elemento Vacio')
      seterror('Escriba algo por favor')
      return
    }
    const arrayEditado = tareas.map(item =>

      item.id === id ? { id, Nombretarea: tarea } : item
    )
    setTareas(arrayEditado)
    setmodoEdicion(false)
    settarea('')
    setid('')
    seterror(null)
  }




  return (
    <div className="container mt-5 ">
      <h1 className="text-center">TO-DO</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {

              tareas.length === 0 ? (

                <li className="list-group-item">No hay tareas</li>
              ) : (
                tareas.map(item => (

                  <li className="list-group-item" key={item.id}>
                    <span className="lead">
                      {item.Nombretarea}
                    </span>

                    <button class="btn btn-sm btn-danger float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}>

                      Eliminar
                  </button>

                    <button class="btn btn-sm btn-warning float-right"
                      onClick={() => editar(item)}>

                      Editar
                    </button>


                  </li>

                ))
              )


            }




          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea} >

            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input type="text" className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={e => settarea(e.target.value)}
              value={tarea} />
            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block " type="Submit">Editar</button>
              )
                : (
                  <button className="btn btn-dark btn-block " type="Submit">Agregar</button>
                )
            }

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
