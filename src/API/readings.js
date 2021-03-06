import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllReadings(){
    return axios.get(API_URL+'Readings');
}

export function updateReadings(id, updatedReading){
    return axios.put(API_URL+'Readings/'+id, updatedReading);
}

export function addReadings(updatedReading){
    return axios.post(API_URL+'Readings', updatedReading);
}

export function deleteReadings(id){
    return axios.delete(API_URL+'Readings/'+id);
}


export function postReadingsFromOperator(operatorID, readings){
    return axios.put(API_URL+'Readings/WithOperator/'+operatorID, readings);
}