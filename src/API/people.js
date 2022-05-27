import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllPeople(){
    return axios.get(API_URL+'People');
}

export function addPeople(person){
    return axios.post(API_URL+'People', person);
}

export function putPeople(id, person){
    return axios.put(API_URL+'People/'+id, person);
}

export function deletePeople(id){
    return axios.delete(API_URL+'People/'+id);
}