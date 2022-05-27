import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllCities(){
    return axios.get(API_URL+'Cities');
}

export function addCity(city){
    return axios.post(API_URL+'Cities', city);
}

export function putCity(id, city){
    return axios.put(API_URL+'Cities/'+id, city);
}

export function deleteCity(id){
    return axios.delete(API_URL+'Cities/'+id);
}