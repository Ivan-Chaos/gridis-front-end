import axios from 'axios';
import {API_URL} from '../consts/api'


export function getSingleAdmin(id){
    return axios.get(API_URL+'Admins/'+id);
}