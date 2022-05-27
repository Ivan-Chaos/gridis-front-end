import axios from 'axios';
import {API_URL} from '../consts/api'

export function initiateGeneration(){
    return axios.get(API_URL+'Mailing');
}