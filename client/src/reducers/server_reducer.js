//will be deleted
import { TEST_SERVER } from '../actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case TEST_SERVER:
            return { ...state, server: action.payload }
        default:
            return state;
    }

}