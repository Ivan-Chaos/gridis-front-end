import axios from 'axios';
import {API_URL} from '../consts/api'

export function getAllInvoices(){
    return axios.get(API_URL+'Payments');
}

export function addInvoice(invoice){
    return axios.post(API_URL+'Payments', invoice);
}

export function putInvoice(id, invoice){
    return axios.put(API_URL+'Payments/'+id, invoice);
}

export function deleteInvoice(id){
    return axios.delete(API_URL+'Payments/'+id);
}