import axios from 'axios';
import {
    ADD_USER_CONTACT_MESSAGE,
    GET_USER_REQUESTS,
    DELETED_CONTACT
} from './types';

import { CONTACT_SERVER } from '../components/utils/misc';

export function addUserContactMessage(datatoSubmit) {
    console.log(datatoSubmit);
    const request = axios.post(`${CONTACT_SERVER}/`, datatoSubmit)
        .then(response => response.data);
    return {
        type: ADD_USER_CONTACT_MESSAGE,
        payload: request
    }
}

export function getUserRequests() {
    const request = axios.get(`${CONTACT_SERVER}/`)
        .then(response => response.data);
    return {
        type: GET_USER_REQUESTS,
        payload: request
    }
}

export function deleteContact(id) {
    const request = axios.delete(`${CONTACT_SERVER}/delete?id=${id}`)
        .then(response => response.data);
    return {
        type: DELETED_CONTACT,
        payload: request,
        contact_id: id
    }
}

export function getUserRequest(id) {
    const request = axios.get(`${CONTACT_SERVER}?id=${id}`)
        .then(response => response.data);
    return {
        type: GET_USER_REQUESTS,
        payload: request
    }
}