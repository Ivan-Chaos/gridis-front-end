import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllMeterModels(){
    return axios.get(API_URL+'MeterModels');
}