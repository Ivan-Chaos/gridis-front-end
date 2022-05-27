import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllServices(){
    return axios.get(API_URL+'Services');
}

export function addService(service){
    return axios.post(API_URL+'Services', service);
}

export function putService(id, service){
    return axios.put(API_URL+'Services/'+id, service);
}

export function deleteService(id){
    return axios.delete(API_URL+'Services/'+id);
}