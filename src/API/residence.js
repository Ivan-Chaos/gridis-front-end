import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllResidences(){
    return axios.get(API_URL+'Residences');
}

export function putResidence(id, residence){
    return axios.put(API_URL+'Residences/'+id, residence)
}