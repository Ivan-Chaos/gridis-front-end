import axios from 'axios';
import {API_URL} from '../consts/api'


export function getSingleEnigneer(id){
    return axios.get(API_URL+'Engineers/'+id);
}