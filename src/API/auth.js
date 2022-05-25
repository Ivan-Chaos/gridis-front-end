import axios from 'axios';
import {API_URL} from '../consts/api'

export function userLogin(username, password){
    return axios.post(API_URL+'Auth/login', {username, password});
}