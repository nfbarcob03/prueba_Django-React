import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ApiServicesProducto{

    constructor(){}
	
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
	getProductosByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
	
	
}