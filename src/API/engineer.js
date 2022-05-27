import axios from 'axios';
import {API_URL} from '../consts/api'


export function getSingleEnigneer(id){
    return axios.get(API_URL+'Engineers/'+id);
}

export function getAllEngineers(){
    return axios.get(API_URL+'Engineers');
}

export function putEngineer(id, engineer){
    return axios.put(API_URL+'Engineers/'+id, engineer);
}

export function addEngineer(engineer){
    return axios.post(API_URL+'Engineers', engineer);
}

export function deleteEngineer(id){
    return axios.delete(API_URL+'Engineers/'+id);
}