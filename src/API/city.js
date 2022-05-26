import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllCities(){
    return axios.get(API_URL+'Cities');
}