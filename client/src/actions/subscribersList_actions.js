import axios from "axios";

import { GET_LIST_SUBSCRIBERS } from "./types";
import { USER_ADMIN_SERVER } from "../components/utils/misc";

export function getSubscribers() {
  const request = axios
    .get(`${USER_ADMIN_SERVER}/subscribers`)
    .then((response) => response.data);

  return {
    type: GET_LIST_SUBSCRIBERS,
    payload: request,
  };
}
