import { GET_AUTHOR_REQUEST, GET_AUTHOR_SUCCESS, GET_AUTHOR_FAILURE, POST_AUTHOR_REQUEST, POST_AUTHOR_SUCCESS, POST_AUTHOR_FAILURE, PUT_AUTHOR_REQUEST, PUT_AUTHOR_SUCCESS, PUT_AUTHOR_FAILURE } from "../actions/types";
import { GET_CURRENT_AUTHOR_REQUEST, GET_CURRENT_AUTHOR_SUCCESS, GET_CURRENT_AUTHOR_FAILURE, DELETE_AUTHOR_REQUEST, DELETE_AUTHOR_SUCCESS, DELETE_AUTHOR_FAILURE } from '../actions/types';

const initailState = {
    all_author: [],
    isAuthorLoading: false,
    error: {},
    current_author: {}
}
const authorReducer = (state = initailState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_AUTHOR_REQUEST:
        case GET_CURRENT_AUTHOR_REQUEST:
        case POST_AUTHOR_REQUEST:
        case PUT_AUTHOR_REQUEST:
        case DELETE_AUTHOR_REQUEST:
            return {
                ...state, isAuthorLoading: true, current_author: {}
            }
        case GET_AUTHOR_SUCCESS:
            return {
                ...state, all_author: payload, isAuthorLoading: false
            }
        case GET_CURRENT_AUTHOR_SUCCESS:
            return {
                ...state, current_author: payload, isAuthorLoading: false
            }
        case POST_AUTHOR_SUCCESS:
        case PUT_AUTHOR_SUCCESS:
        case DELETE_AUTHOR_SUCCESS:
            return {
                ...state, isAuthorLoading: false
            }
        case GET_AUTHOR_FAILURE:
        case GET_CURRENT_AUTHOR_FAILURE:
        case POST_AUTHOR_FAILURE:
        case PUT_AUTHOR_FAILURE:
        case DELETE_AUTHOR_FAILURE:
            return {
                ...state, error: payload, isBookLoading: false
            }
        default:
            return state;
    }
};
export default authorReducer;