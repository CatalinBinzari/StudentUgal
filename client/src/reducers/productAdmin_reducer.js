import {
  ADD_PRODUCT,
  GET_PRODUCT,
  CLEAR_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  GET_PRODUCTS_TO_SHOP, //catalin
  CLEAR_PRODUCT_BY_ID,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
    case GET_PRODUCT:
      return { ...state, getProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    case DELETE_PRODUCT:
      return { ...state, deletedProduct: action.payload };
    case GET_PRODUCT_BY_ID:
      return { ...state, getProductById: action.payload };
    case UPDATE_PRODUCT_BY_ID:
      return { ...state, updateProduct: action.payload };
    case GET_PRODUCTS_TO_SHOP: //we will get two things from products_actions
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size,
      };
    case CLEAR_PRODUCT_BY_ID:
      return { ...state, getProductById: action.payload };
    default:
      return state;
  }
}
