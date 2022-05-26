import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllStreets(){
    return axios.get(API_URL+'Streets');
}