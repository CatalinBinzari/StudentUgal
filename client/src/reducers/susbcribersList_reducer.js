import { GET_LIST_SUBSCRIBERS } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_LIST_SUBSCRIBERS:
      return { ...state, getSubscribers: action.payload };

    default:
      return state;
  }
}
