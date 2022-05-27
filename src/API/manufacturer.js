import axios from 'axios';
import { API_URL } from '../consts/api'

export function getAllManufacturers() {
    return axios.get(API_URL + 'Manufacturers');
}

export function putManufacturer(id, manufacturer) {
    return axios.put(API_URL + 'Manufacturers/' + id, manufacturer)
}

export function addManufacturer(manufacturer) {
    return axios.post(API_URL + 'Manufacturers', manufacturer)
}

export function deleteManufacturer(id) {
    return axios.delete(API_URL + 'Manufacturers/' + id);
}

