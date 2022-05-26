import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllServices(){
    return axios.get(API_URL+'Services');
}