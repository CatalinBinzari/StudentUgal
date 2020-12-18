import axios from "axios";

import { GET_LIST_USERS } from "./types";
import { USER_ADMIN_SERVER } from "../components/utils/misc";

export function getUsers() {
  const request = axios
    .get(`${USER_ADMIN_SERVER}/users`)
    .then((response) => response.data);

  return {
    type: GET_LIST_USERS,
    payload: request,
  };
}
