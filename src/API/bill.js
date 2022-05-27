import axios from 'axios';
import {API_URL} from '../consts/api'


export function getSingleBill(id){
    return axios.get(API_URL+'Bills/'+id);
}

export function getAllBills(){
    return axios.get(API_URL+'Bills');
}

export function putBill(id, bill){
    return axios.put(API_URL+'Bills/'+id, bill);
}

export function addBill(bill){
    return axios.post(API_URL+'Bills', bill);
}

export function deleteBill(id){
    return axios.delete(API_URL+'Bills/'+id);
}