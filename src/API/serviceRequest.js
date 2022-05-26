import axios from 'axios';
import {API_URL} from '../consts/api'

export function createServiceRequest(request){
    return axios.post(API_URL+'ServiceRequests', request);
}