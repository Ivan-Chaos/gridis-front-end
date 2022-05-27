import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllAddresses(){
    return axios.get(API_URL+'Addresses');
}

export function addAddress(address){
    return axios.post(API_URL+'Addresses', address);
}

export function putAddress(id, address){
    return axios.put(API_URL+'Addresses/'+id, address);
}

export function deleteAddress(id){
    return axios.delete(API_URL+'Addresses/'+id);
}