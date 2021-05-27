import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ApiServices{

    constructor(){}

//Funciones del modelo cliente
    getAllClientes() {
        const url = `${API_URL}/cliente/creatListarClientes/`;
        return axios.get(url).then(response => response.data);
    }
	createCliente(cliente){
        const url = `${API_URL}/cliente/creatListarClientes/`;
        return axios.post(url,cliente);
    }
	getCliente(cliente_id) {
        const url = `${API_URL}/cliente/clienteDetalle/${cliente_id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteCliente(cliente){
        const url = `${API_URL}/api/customers/${cliente.cliente_id}`;
        return axios.delete(url);
    }
    updateCliente(cliente){
        const url = `${API_URL}/api/customers/${cliente.cliente_id}`;
        return axios.put(url,customer);
    }
	
//Funciones del modelo producto
    getAllClientes() {
        const url = `${API_URL}/producto/creatListarProductos/`;
        return axios.get(url).then(response => response.data);
    }
	createCliente(producto){
        const url = `${API_URL}/producto/creatListarProductos/`;
        return axios.post(url,producto);
    }
	getCliente(producto_id) {
        const url = `${API_URL}/producto/productoDetalle/${producto_id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteCliente(producto){
        const url = `${API_URL}/producto/productoDetalle/${producto.producto_id}`;
        return axios.delete(url);
    }
    updateCliente(producto){
        const url = `${API_URL}/producto/productoDetalle/${producto.producto_id}`;
        return axios.put(url,customer);
    }
	
//Funciones del modelo orden
    getAllOrdenes() {
        const url = `${API_URL}/orden/filtrarOrdenesByClienteAndFecha/`;
        return axios.get(url).then(response => response.data);
    }
	getOrdenesFiltradas(filtro) {
        const url = `${API_URL}/orden/filtrarOrdenesByClienteAndFecha/?${filtro}`;
        return axios.get(url).then(response => response.data);
    }
	createOrden(producto){
        const url = `${API_URL}/orden/crearOrden/`;
        return axios.post(url,producto);
    }	
	
//Funciones del modelo prodcuto-permitido
    getAllProductosPermitidos() {
        const url = `${API_URL}/producto-permitido/listarProductoPermitido/`;
        return axios.get(url).then(response => response.data);
    }
	getProductosPermitidosFiltrados(filtro) {
        const url = `${API_URL}/producto-permitido/listarProductoPermitido/?${filtro}`;
        return axios.get(url).then(response => response.data);
    }
	createOrden(producto){
        const url = `${API_URL}/producto-permitido/asociarClienteProducto/`;
        return axios.post(url,producto);
    }	


}