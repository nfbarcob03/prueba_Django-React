import axios from 'axios';
const API_URL = 'http://localhost:8000';
const headers = {
  'Content-Type': 'application/json'
}

export default class ApiServicesCliente{

    constructor(){}

//Funciones del modelo cliente
    getAllClientes() {
        const url = `${API_URL}/cliente/crearListarClientes/`;
        return axios.get(url).then(response => response.data);
    }
	createCliente(cliente){
        const url = `${API_URL}/cliente/crearListarClientes/`;
		return axios({
					  method: 'post',
					  url: url,
					  data: cliente,
					  headers: {"Access-Control-Allow-Origin": "*"}
					});
        //return axios.post(url,cliente,{headers: headers});
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
		return axios({
					  method: 'put',
					  url: url,
					  data: cliente,
					  headers: {"Access-Control-Allow-Origin": "*"}
					});
        //return axios.put(url,cliente,{headers: headers});
    }
	getClientesByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

}