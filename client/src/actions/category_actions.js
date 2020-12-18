import axios from 'axios';
import {
    GET_CATEGORIES,
    DELETED_CATEGORY,
    MODIFIED_CATEGORY,
    ADD_CATEGORY,
    GET_CATEGORY,
    ADDED_SUBCATEGORY,
    DELETED_SUBCATEGORY,
    CLEAR_EDIT_CATEGORY
} from './types';

import { CATEGORY_SERVER } from '../components/utils/misc';

export function getCategories() {
    const request = axios.get(`${CATEGORY_SERVER}/`)
        .then(response => response.data);
    return {
        type: GET_CATEGORIES,
        payload: request
    }
}

export function getCategory(id) {
    const request = axios.get(`${CATEGORY_SERVER}?id=${id}`)
        .then(response => response.data);
    console.log(request);
    return {
        type: GET_CATEGORY,
        payload: request
    }
}

export function deleteCategory(id) {
    const request = axios.delete(`${CATEGORY_SERVER}/delete?id=${id}`)
        .then(response => response.data);
    return {
        type: DELETED_CATEGORY,
        payload: request,
        category_name: id
    }
}

export function modifyCategory(old_category, new_category) {
    const request = axios.put(`${CATEGORY_SERVER}/modify?old=${old_category}&new=${new_category}`)
        .then(response => response.data);
    return {
        type: MODIFIED_CATEGORY,
        payload: request
    }
}

export function addCategory(datatoSubmit) {
    console.log(datatoSubmit);
    const request = axios.post(`${CATEGORY_SERVER}/`, datatoSubmit)
        .then(response => response.data);

    return {
        type: ADD_CATEGORY,
        payload: request
    }
}

export function addSubcategory(id, datatoSubmit) {
    const request = axios.put(`${CATEGORY_SERVER}/subcategory?id=${id}&subcategory=${datatoSubmit}`)
        .then(response => response.data);

    return {
        type: ADDED_SUBCATEGORY,
        payload: request,
    }
}

export function deleteSubcategory(id, datatoDelete) {
    const request = axios.delete(`${CATEGORY_SERVER}/subcategory?id=${id}&subcategory=${datatoDelete}`)
        .then(response => response.data);

    return {
        type: DELETED_SUBCATEGORY,
        payload: request,
    }
}

export function clearEditCategory() {
    return {
        type: CLEAR_EDIT_CATEGORY,
        payload: ''
    }
}