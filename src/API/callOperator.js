import axios from 'axios';
import {API_URL} from '../consts/api'


export function getSingleCallOperator(id){
    return axios.get(API_URL+'CallOperators/'+id);
}

export function getAllCallOperators(){
    return axios.get(API_URL+'CallOperators');
}

export function putCallOperator(id, callOperator){
    return axios.put(API_URL+'CallOperators/'+id, callOperator);
}

export function addCallOperator(callOperator){
    return axios.post(API_URL+'CallOperators', callOperator);
}

export function deleteCallOperator(id){
    return axios.delete(API_URL+'CallOperators/'+id);
}