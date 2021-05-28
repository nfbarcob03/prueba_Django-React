import  React, { Component } from  'react';
import  ApiServicesCliente  from  '../ApiServices/ApiServicesCliente';


const  clienteService  =  new  ApiServicesCliente();

class  ClienteList  extends  Component {

constructor(props) {
	
    super(props);
	
    this.state  = {
        clientes: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    clienteService.getAllClientes().then(function (result) {
        console.log(result);
        self.setState({ clientes:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,cliente_id){
    var  self  =  this;
    clienteService.deleteCliente(cliente_id).then(()=>{
        var  newArr  =  self.state.clientes.filter(function(obj) {
            return  obj.cliente_id  !==  cliente_id;
        });

        self.setState({clientes:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    clienteService.getClientesByURL(this.state.nextPageURL).then((result) => {
        self.setState({ clientes:  result.data, nextPageURL:  result.nextlink})
    });
}
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
                <td>{c.cliente_id}  </td>
                <td>{c.nombre}</td>
                <td>{c.correo}</td>
                <td>
                <button type="button" class="btn btn-danger"  onClick={(e)=>  this.handleDelete(e,c.cliente_id) }> Delete</button>
                <a class="btn btn-warning mr-3 ml-3"  href={"/cliente/" + c.cliente_id}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            
			<div class="grid">
				<div class="row mb-2">
					<button  className="btn btn-primary mr-5"  onClick=  {  this.nextPage  }>Next</button>
				</div>
				<div class="row mt-2">
					<a class="btn btn-primary mr-5"  href="/cliente" role="button">Crear Nuevo Cliente</a>
				</div>
			</div>
        </div>
        );
  }
};




class ClienteCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.cliente_id)
        {
          clienteService.getCliente(params.cliente_id).then((c)=>{
            this.refs.nombre.value = c.nombre;
            this.refs.correo.value = c.correo;
          })
        }
      }

      handleCreate(){
		var data = {
            "nombre": this.refs.nombre.value,
            "correo": this.refs.correo.value
        };
        clienteService.createCliente(data).then((result)=>{
          alert("Cliente creado con exito!");
        }).catch(()=>{
          alert('Hubo un error creando el cliente. Por favor vuelva a intentarlo.');
        });
      }
      handleUpdate(cliente_id){
		  var data = {
            "cliente_id": parseInt(cliente_id),
            "nombre": this.refs.nombre.value,
            "correo": this.refs.correo.value
        };
		console.log(data)
        clienteService.updateCliente(data).then((result)=>{
          console.log(result);
          alert("Cliente actualizado con exito!");
        }).catch(()=>{
          alert('Hubo un error actualiuzando el cliente. Por favor vuelva a intentarlo.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.cliente_id){
          this.handleUpdate(params.cliente_id);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
		
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>
              Nombre:</label>
              <input className="form-control" type="text" ref='nombre' />

            <label>
              Correo:</label>
              <input className="form-control " type="text" ref='correo'/>

            <input className="btn btn-success mr-5 mt-5" type="submit" value="Guardar" />
			<a class="btn btn-secondary mr-5 mt-5"  href="/cliente-list"> Volver </a>
            </div>
          </form>
        );
      }
};

export  {
  ClienteCreateUpdate,
  ClienteList
};
