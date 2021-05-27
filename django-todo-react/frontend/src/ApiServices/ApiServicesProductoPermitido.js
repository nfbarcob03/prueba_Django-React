import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ApiServicesProductoPermitido{

    constructor(){}

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