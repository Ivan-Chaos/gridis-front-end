import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllDistricts(){
    return axios.get(API_URL+'Districts');
}