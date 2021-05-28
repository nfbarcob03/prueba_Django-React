import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ApiServicesProducto{

    constructor(){}
	
//Funciones del modelo producto
    getAllProductos() {
        const url = `${API_URL}/producto/crearListarProductos/`;
        return axios.get(url).then(response => response.data);
    }
	createProducto(producto){
        const url = `${API_URL}/producto/crearListarProductos/`;
        return axios.post(url,producto);
    }
	getProducto(producto_id) {
        const url = `${API_URL}/producto/productoDetalle/${producto_id}`;
        return axios.get(url).then(response => response.data);
    }
    deleteProducto(producto){
        const url = `${API_URL}/producto/productoDetalle/${producto.producto_id}`;
        return axios.delete(url);
    }
    updateProducto(producto){
        const url = `${API_URL}/producto/productoDetalle/${producto.producto_id}`;
        return axios.put(url,producto);
    }
	getProductosByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
	
	
}