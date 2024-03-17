import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="https://pizzapi-9e278-default-rtdb.firebaseio.com/pizzas/jb7k8eZOEoPsfPamq6XWD1Fjb0o2.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwOWY4ZTMzN2ZjNzg1NTE0ZTExMGM2ZDg0N2Y0M2M3NDM1M2U0YWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGl6emFwaS05ZTI3OCIsImF1ZCI6InBpenphcGktOWUyNzgiLCJhdXRoX3RpbWUiOjE3MTAxODAxNjYsInVzZXJfaWQiOiJqYjdrOGVaT0VvUHNmUGFtcTZYV0QxRmpiMG8yIiwic3ViIjoiamI3azhlWk9Fb1BzZlBhbXE2WFdEMUZqYjBvMiIsImlhdCI6MTcxMDE4MDE2NiwiZXhwIjoxNzEwMTgzNzY2LCJlbWFpbCI6Im1hcmxvbkBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtYXJsb25Ab3V0bG9vay5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.xBJtXOgPD84tETfRU9v58znlCadwiUeektW1YcMGgzBcZyneT1sM7v_Deytxd2bE0NJLvKbcid3sIG1F_0rgbdaE2bNrUeCKocjEm0WViSy1OCBLkFrzcZ2DIbGlq39Jm2KwsDWIqdhguqN3NfKpaYR9Sq36s-3FHHz9iBbCgIJdPj5b6NCYi_K4xcZJ_T5qLa8pCNSELAxbosiPQbaxosKRIkM0Pui3g7Ed7umNbna6hxi4-dwa_W0Guut60zJEuaN9ONdKuQzaCpXjTsDe7w20pDaWfbwPLOb2JoUGLZba3IzuZ38jiim9FSxxRPHmyP3sv6yKVCivSI4YUbZuHw";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    pizza: '',
    ingredientes: '',
    precio: '',
    tamaño: '',
    tipoModal: ''
  }
}

peticionGet = () => {
  axios.get(url)
    .then(response => {
      
      const pizzasArray = Object.values(response.data);

      
      const tokens = Object.keys(response.data);

      
      this.setState(prevState => ({
        data: pizzasArray,
        tokens: tokens 
      }));

      console.log(response);
      console.log(pizzasArray);
      console.log(tokens);
    })
    .catch(error => {
      console.log(error.message);
    });
}




peticionPost=async()=>{
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut = () => {
  const { id, pizza, ingredientes, precio, tamaño } = this.state.form;
  const updatedPizza = {
    id,
    pizza,
    ingredientes,
    precio,
    tamaño
  };

 
  const token = this.state.tokens[this.state.data.findIndex(p => p.id === id)];

  if (!token) {
    console.error("No se encontró el token para la pizza seleccionada.");
    return;
  }

  
  const putUrl = `https://pizzapi-9e278-default-rtdb.firebaseio.com/pizzas/jb7k8eZOEoPsfPamq6XWD1Fjb0o2/${token}.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwOWY4ZTMzN2ZjNzg1NTE0ZTExMGM2ZDg0N2Y0M2M3NDM1M2U0YWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGl6emFwaS05ZTI3OCIsImF1ZCI6InBpenphcGktOWUyNzgiLCJhdXRoX3RpbWUiOjE3MTAxODAxNjYsInVzZXJfaWQiOiJqYjdrOGVaT0VvUHNmUGFtcTZYV0QxRmpiMG8yIiwic3ViIjoiamI3azhlWk9Fb1BzZlBhbXE2WFdEMUZqYjBvMiIsImlhdCI6MTcxMDE4MDE2NiwiZXhwIjoxNzEwMTgzNzY2LCJlbWFpbCI6Im1hcmxvbkBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtYXJsb25Ab3V0bG9vay5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.xBJtXOgPD84tETfRU9v58znlCadwiUeektW1YcMGgzBcZyneT1sM7v_Deytxd2bE0NJLvKbcid3sIG1F_0rgbdaE2bNrUeCKocjEm0WViSy1OCBLkFrzcZ2DIbGlq39Jm2KwsDWIqdhguqN3NfKpaYR9Sq36s-3FHHz9iBbCgIJdPj5b6NCYi_K4xcZJ_T5qLa8pCNSELAxbosiPQbaxosKRIkM0Pui3g7Ed7umNbna6hxi4-dwa_W0Guut60zJEuaN9ONdKuQzaCpXjTsDe7w20pDaWfbwPLOb2JoUGLZba3IzuZ38jiim9FSxxRPHmyP3sv6yKVCivSI4YUbZuHw`;

  axios.put(putUrl, updatedPizza)
    .then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
    .catch(error => {
      console.log(error.message);
    });
}



peticionDelete = () => {
  const id = this.state.form.id;


  const token = this.state.tokens[this.state.data.findIndex(p => p.id === id)];

  if (!token) {
    console.error("No se encontró el token para la pizza seleccionada.");
    return;
  }

  
  const deleteUrl = `https://pizzapi-9e278-default-rtdb.firebaseio.com/pizzas/jb7k8eZOEoPsfPamq6XWD1Fjb0o2/${token}.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwOWY4ZTMzN2ZjNzg1NTE0ZTExMGM2ZDg0N2Y0M2M3NDM1M2U0YWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGl6emFwaS05ZTI3OCIsImF1ZCI6InBpenphcGktOWUyNzgiLCJhdXRoX3RpbWUiOjE3MTAxODAxNjYsInVzZXJfaWQiOiJqYjdrOGVaT0VvUHNmUGFtcTZYV0QxRmpiMG8yIiwic3ViIjoiamI3azhlWk9Fb1BzZlBhbXE2WFdEMUZqYjBvMiIsImlhdCI6MTcxMDE4MDE2NiwiZXhwIjoxNzEwMTgzNzY2LCJlbWFpbCI6Im1hcmxvbkBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtYXJsb25Ab3V0bG9vay5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.xBJtXOgPD84tETfRU9v58znlCadwiUeektW1YcMGgzBcZyneT1sM7v_Deytxd2bE0NJLvKbcid3sIG1F_0rgbdaE2bNrUeCKocjEm0WViSy1OCBLkFrzcZ2DIbGlq39Jm2KwsDWIqdhguqN3NfKpaYR9Sq36s-3FHHz9iBbCgIJdPj5b6NCYi_K4xcZJ_T5qLa8pCNSELAxbosiPQbaxosKRIkM0Pui3g7Ed7umNbna6hxi4-dwa_W0Guut60zJEuaN9ONdKuQzaCpXjTsDe7w20pDaWfbwPLOb2JoUGLZba3IzuZ38jiim9FSxxRPHmyP3sv6yKVCivSI4YUbZuHw`;

  axios.delete(deleteUrl)
    .then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    })
    .catch(error => {
      console.log(error.message);
    });
}


modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarEmpresa=(pizzas)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: pizzas.id,
      pizza: pizzas.pizza,
      ingredientes: pizzas.ingredientes,
      precio: pizzas.precio,
      tamaño: pizzas.tamaño
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    
    const {form}=this.state;
  return (
    <div className="App">
    <div className="App background"></div>
    <div className="content-container"></div>
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar PIZZA</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
         <th>Id</th>
          <th>Pizza</th>
          <th>Ingredientes</th>
          <th>Precio</th>
          <th>Tamaño</th>
          <th>Demostracion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  {this.state.data.map(pizza => (
    <tr key={pizza.id}>
      <td>{pizza.id}</td>
      <td>{pizza.pizza}</td>
      <td>{pizza.ingredientes}</td>
      <td>{pizza.precio}</td>
      <td>{pizza.tamaño}</td>
      <td>
        <img src={`/images/${pizza.id}.jpg`} alt={pizza.pizza} style={{ width: '135px', height: '135px' }} />
      </td>
      <td>
        <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(pizza); this.modalInsertar() }}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {"   "}
        <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(pizza); this.setState({ modalEliminar: true }) }}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

      
      
    </table>
    <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader style={{display: 'block'}}>
              <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
              </ModalHeader>
              <ModalBody>
              <div className="form-group">
             <label htmlFor="id">ID</label>
             <input className="form-control" type="number" name="id" id="id"  onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
               <br />
             <label htmlFor="nombre">pizza</label>
               <input className="form-control" type="text" name="pizza" id="pizza" onChange={this.handleChange} value={form?form.pizza: ''}/>
               <br />
             <label htmlFor="nombre">ingredientes</label>
              <input className="form-control" type="text" name="ingredientes" id="ingredientes" onChange={this.handleChange} value={form?form.ingredientes: ''}/>
              <br />
              <label htmlFor="capital_bursatil">precio</label>
              <input className="form-control" type="text" name="precio" id="precio" onChange={this.handleChange} value={form?form.precio:''}/>
              <br />
              <label htmlFor="capital_bursatil">tamaño</label>
              <input className="form-control" type="text" name="tamaño" id="tamaño" onChange={this.handleChange} value={form?form.tamaño:''}/>
               </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                   Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                   Actualizar
                  </button>
                  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar este producto {form && form.pizza}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>
  );
}
}
export default App;
