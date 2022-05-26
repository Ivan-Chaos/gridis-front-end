import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllAddresses(){
    return axios.get(API_URL+'Addresses');
}