import axios from 'axios';
import {API_URL} from '../consts/api'


export function getSingleCallOperator(id){
    return axios.get(API_URL+'CallOperators/'+id);
}