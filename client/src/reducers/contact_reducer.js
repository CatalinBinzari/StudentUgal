import {
    ADD_USER_CONTACT_MESSAGE,
    GET_USER_REQUESTS,
    DELETED_CONTACT

} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_USER_CONTACT_MESSAGE:
            return { ...state, contact_message: action.payload }
        case GET_USER_REQUESTS:
            return { ...state, user_requests: action.payload }
        case DELETED_CONTACT:
            return { ...state, deleted_contact: action.payload, contact_id: action.contact_id }
        default:
            return state;
    }
}