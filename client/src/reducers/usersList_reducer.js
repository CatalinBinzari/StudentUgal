import { GET_LIST_USERS } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_LIST_USERS:
      return { ...state, getUsers: action.payload };

    default:
      return state;
  }
}
