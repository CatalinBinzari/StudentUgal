import { combineReducers } from "redux";
import user from "./user_reducer";
import server from "./server_reducer";
import category from "./category_reducer";
import productAdmin from "./productAdmin_reducer";
import contact from './contact_reducer'
import products from './products_reducer';

import getUsers from "./usersList_reducer";
import getSubscribers from "./susbcribersList_reducer";


import site from './site_reducer';
const rootReducer = combineReducers({
  user,
  server,
  category,
  productAdmin,
  contact,
  products,

  getUsers,
  getSubscribers,

  site
});

export default rootReducer;
