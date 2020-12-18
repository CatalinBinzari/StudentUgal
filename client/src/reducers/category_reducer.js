import {
    GET_CATEGORIES,
    DELETED_CATEGORY,
    MODIFIED_CATEGORY,
    ADD_CATEGORY,
    GET_CATEGORY,
    ADDED_SUBCATEGORY,
    DELETED_SUBCATEGORY,
    CLEAR_EDIT_CATEGORY
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return { ...state, category: action.payload }
        case GET_CATEGORY:
            return { ...state, modify_category: action.payload }
        case DELETED_CATEGORY:
            return { ...state, del_category: action.payload, category_id: action.category_id }
        case MODIFIED_CATEGORY:
            return {
                ...state, modified_category: action.payload
            }
        case DELETED_SUBCATEGORY:
            return {
                ...state, delete_category: action.payload
            }
        case ADDED_SUBCATEGORY:
            return {
                ...state, add_subcategory: action.payload
            }
        case ADD_CATEGORY:
            return {
                ...state, add_category: action.payload
            }
        case CLEAR_EDIT_CATEGORY:
            return {
                ...state, modify_category: action.payload
            }
        default:
            return state;
    }
}