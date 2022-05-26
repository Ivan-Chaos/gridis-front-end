import axios from 'axios';
import {API_URL} from '../consts/api'

export function putProvidedService(id, providedService){
    return axios.put(API_URL+'ProvidedServices/'+id, providedService);
}