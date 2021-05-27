import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ApiServicesOrden{

    constructor(){}

	
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
	
}