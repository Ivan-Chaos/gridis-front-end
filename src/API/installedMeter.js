import axios from 'axios';
import {API_URL} from '../consts/api'

export function postInstalledMeter(installedMeter){
    return axios.post(API_URL+'InstalledMeters', installedMeter);
}

export function getAllInstalledMeters(){
    return axios.get(API_URL+'InstalledMeters')
}

export function putInstalledMeter(id, installedMeter) {
    return axios.put(API_URL + 'InstalledMeters/' + id, installedMeter)
}

export function deleteInstalledMeter(id) {
    return axios.delete(API_URL + 'InstalledMeters/' + id);
}