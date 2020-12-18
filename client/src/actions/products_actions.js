import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from './types';
 
import { PRODUCT_SERVER } from '../components/utils/misc';


export function getProductDetail(id){

    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
        return response.data[0]
    });

    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }

}


export function clearProductDetail(){
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload:''
    }
}



export function getProductsBySell(){
    //?sortBy=sold&order=desc&limit=100
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }

}

export function getProductsByArrival(){
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}


