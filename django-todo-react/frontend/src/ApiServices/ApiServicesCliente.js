import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ApiServicesCliente{

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
    deleteCliente(cliente_id){
        const url = `${API_URL}/cliente/clienteDetalle/${cliente_id}`;
        return axios.delete(url);
    }
    updateCliente(cliente){
        const url = `${API_URL}/cliente/clienteDetalle/${cliente.cliente_id}`;
        return axios.put(url,cliente);
    }
	getClientesByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

}