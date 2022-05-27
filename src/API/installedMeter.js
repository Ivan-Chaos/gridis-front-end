import axios from 'axios';
import {API_URL} from '../consts/api'

export function postInstalledMeter(installedMeter){
    return axios.post(API_URL+'InstalledMeters', installedMeter);
}

export function getAllInstalledMeters(){
    return axios.get(API_URL+'InstalledMeters')
}