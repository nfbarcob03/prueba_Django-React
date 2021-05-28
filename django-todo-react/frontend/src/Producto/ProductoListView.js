import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
 
class ClienteListView extends Component {
  render() {
    return (
      <div  className="cliente--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
            </tr>
            </thead>
            <tbody>
            {this.state.clientes.map( c  =>
                <tr  key={c.cliente_id}>
                <td>{c.pk}  </td>
                <td>{c.nombre}</td>
                <td>{c.correo}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.cliente_id) }> Delete</button>
                <a  href={"/cliente/" + c.cliente_id}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            
			<div class="grid">
				<div class="row mb-2">
					<button  className="btn btn-primary mr-5"  onClick=  {  this.nextPage  }>Next</button>
				</div>
				<div class="row mt-2">
					<a class="btn btn-primary mr-5" href="/cliente" role="button">Crear Nuevo Cliente</a>
				</div>
			</div>
        </div>      
    );
  }
}
 
export default ClienteListView;