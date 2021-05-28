import  React, { Component } from  'react';
import  ApiServicesProducto  from  '../ApiServices/ApiServicesProducto';

const  productoService  =  new  ApiServicesProducto();

class  ProductoList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        productos: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    productoService.getAllProductos().then(function (result) {
        console.log(result);
        self.setState({ productos:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,producto_id){
    var  self  =  this;
    productoService.deleteProducto(producto_id).then(()=>{
        var  newArr  =  self.state.productos.filter(function(obj) {
            return  obj.producto_id  !==  producto_id;
        });

        self.setState({productos:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    productoService.getProductosByURL(this.state.nextPageURL).then((result) => {
        self.setState({ productos:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        <div  className="producto--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
				<th>Descripción</th>
            </tr>
            </thead>
            <tbody>
            {this.state.productos.map( p  =>
                <tr  key={p.producto_id}>
                <td>{p.producto_id}  </td>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
				<td>{p.descripcion}</td>
                <td>
                <button type="button" class="btn btn-danger" onClick={(e)=>  this.handleDelete(e,p.producto_id) }> Delete</button>
                <a  class="btn btn-warning mr-3 ml-3" href={"/producto/" + p.producto_id}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            
			<div class="grid">
				<div class="row mb-2">
					<button  className="btn btn-primary mr-5"  onClick=  {  this.nextPage  }>Next</button>
				</div>
				<div class="row mt-2">
					<a class="btn btn-primary mr-5" href="/producto" role="button">Crear Nuevo Producto</a>
				</div>
			</div>
        </div>
        );
  }
};




class ProductoCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.producto_id)
        {
          productoService.getProducto(params.producto_id).then((p)=>{
            this.refs.nombre.value = p.nombre;
            this.refs.precio.value = p.precio;
			this.refs.descripcion.value = p.descripcion;
          })
        }
      }

      handleCreate(){
		var data = {
            "nombre": this.refs.nombre.value,
            "precio": this.refs.precio.value,
			"descripcion": this.refs.descripcion.value
        };
        productoService.createProducto(data).then((result)=>{
          alert("Producto creado con exito!");
        }).catch(()=>{
          alert('Hubo un error creando el producto. Por favor vuelva a intentarlo.');
        });
      }
      handleUpdate(producto_id){
		  var data = {
            "producto_id": parseInt(producto_id),
            "nombre": this.refs.nombre.value,
            "precio": this.refs.precio.value,
			"descripcion": this.refs.descripcion.value
        };
		console.log(data)
        productoService.updateProducto(data).then((result)=>{
          console.log(result);
          alert("Producto actualizado con exito!");
        }).catch(()=>{
          alert('Hubo un error actualiuzando el producto. Por favor vuelva a intentarlo.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.producto_id){
          this.handleUpdate(params.producto_id);
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
              Precio:</label>
              <input className="form-control " type="text" ref='precio'/>

			<label>
              Descripción:</label>
              <input className="form-control " type="text" ref='descripcion'/>

            <input className="btn btn-success mr-5 mt-5" type="submit" value="Guardar" />
			<a class="btn btn-secondary mr-5 mt-5" href="/producto-list" > Volver </a>
            </div>
          </form>
        );
      }
};

export  {
  ProductoCreateUpdate,
  ProductoList
};
