import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllDistricts(){
    return axios.get(API_URL+'Districts');
}

export function addDistrict(district){
    return axios.post(API_URL+'Districts', district);
}

export function putDistrict(id, district){
    return axios.put(API_URL+'Districts/'+id, district);
}

export function deleteDistrict(id){
    return axios.delete(API_URL+'Districts/'+id);
}