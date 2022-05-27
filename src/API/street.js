import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllStreets(){
    return axios.get(API_URL+'Streets');
}

export function addStreet(street){
    return axios.post(API_URL+'Streets', street);
}

export function putStreet(id, street){
    return axios.put(API_URL+'Streets/'+id, street);
}

export function deleteStreet(id){
    return axios.delete(API_URL+'Streets/'+id);
}