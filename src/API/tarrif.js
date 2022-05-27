import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllTarrifs(){
    return axios.get(API_URL+'Tarrifs');
}

export function addTarrif(tarrif){
    return axios.post(API_URL+'Tarrifs', tarrif);
}

export function putTarrif(id, tarrif){
    return axios.put(API_URL+'Tarrifs/'+id, tarrif);
}

export function deleteTarrif(id){
    return axios.delete(API_URL+'Tarrifs/'+id);
}