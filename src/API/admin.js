import axios from 'axios';
import {API_URL} from '../consts/api'


export function getSingleAdmin(id){
    return axios.get(API_URL+'Admins/'+id);
}

export function getAllAdmins(){
    return axios.get(API_URL+'Admins');
}

export function putAdmin(id, admin){
    return axios.put(API_URL+'Admins/'+id, admin);
}

export function addAdmin(admin){
    return axios.post(API_URL+'Admins', admin);
}

export function deleteAdmin(id){
    return axios.delete(API_URL+'Admins/'+id);
}