import axios from "axios";

import {
  ADD_PRODUCT,
  GET_PRODUCT,
  CLEAR_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  GET_PRODUCTS_TO_SHOP,
  CLEAR_PRODUCT_BY_ID,
} from "./types";
import { PRODUCT_SERVER } from "../components/utils/misc";

export function addProduct(datatoSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}`, datatoSubmit)
    .then((response) => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request,
  };
}

export function getProduct() {
  const request = axios
    .get(`${PRODUCT_SERVER}`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCT,
    payload: request,
  };
}

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: "",
  };
}
export function clearProductById() {
  return {
    type: CLEAR_PRODUCT_BY_ID,
    payload: "",
  };
}

export function deleteProduct(id) {
  const request = axios
    .delete(`${PRODUCT_SERVER}/delete?id=${id}`)
    .then((response) => response.data);

  return {
    type: DELETE_PRODUCT,
    payload: request,
  };
}

export function getProductById(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/prod_by_id?id=${id}`)
    .then((response) => response.data);
  //add
  return {
    type: GET_PRODUCT_BY_ID,
    payload: request,
  };
}

export function updateProductById(id, datatoSubmit) {
  const request = axios
    .put(`${PRODUCT_SERVER}/update?id=${id}`, datatoSubmit)
    .then((response) => response.data);

  return {
    type: UPDATE_PRODUCT_BY_ID,
    payload: request,
  };
}
///////////////////////////////////
//
export function getProductsToShop(
  skip,
  limit,
  filters = [],
  previousState = []
) {
  const data = {
    //object with data to submit to server
    limit,
    skip,
    filters,
  };
  const request = axios
    .post(`${PRODUCT_SERVER}/shop`, data)
    .then((response) => {
      //from server we get an object with 2 things inside, size && articles
      let newState = [
        //merge what we had with what we want to have from the server, may be empty array
        ...previousState, //empty array or previous 6,12,18...
        ...response.data.articles,
      ];

      return {
        size: response.data.size,
        articles: newState,
      };
    });
  return {
    //with redux we have to return smth
    //the reducer will be getting this
    type: GET_PRODUCTS_TO_SHOP,
    payload: request,
  };
}
///////////////////////////////////
