import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllMeterModels(){
    return axios.get(API_URL+'MeterModels');
}

export function putMeterModel(id, meterModel) {
    return axios.put(API_URL + 'MeterModels/' + id, meterModel)
}

export function addMeterModel(meterModel) {
    return axios.post(API_URL + 'MeterModels', meterModel)
}

export function deleteMeterModel(id) {
    return axios.delete(API_URL + 'MeterModels/' + id);
}

