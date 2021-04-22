import { GET_BOOK_REQUEST, GET_BOOK_SUCCESS, GET_BOOK_FAILURE, POST_BOOK_REQUEST, POST_BOOK_SUCCESS, POST_BOOK_FAILURE, PUT_BOOK_REQUEST, PUT_BOOK_SUCCESS, PUT_BOOK_FAILURE } from "../actions/types";
import { GET_CURRENT_BOOK_REQUEST, GET_CURRENT_BOOK_SUCCESS, GET_CURRENT_BOOK_FAILURE } from '../actions/types';

const initailState = {
    all_book: [],
    isBookLoading: false,
    error: {},
    current_book: {}
}
const bookReducer = (state = initailState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_BOOK_REQUEST:
        case GET_CURRENT_BOOK_REQUEST:
        case POST_BOOK_REQUEST:
        case PUT_BOOK_REQUEST:

            return {
                ...state, isBookLoading: true
            }
        case GET_BOOK_SUCCESS:
            return {
                ...state, all_book: payload, isBookLoading: false
            }
        case GET_CURRENT_BOOK_SUCCESS:
            return {
                ...state, current_book: payload, isBookLoading: false
            }
        case POST_BOOK_SUCCESS:
        case PUT_BOOK_SUCCESS:
            return {
                ...state, isBookLoading: false
            }
        case GET_BOOK_FAILURE:
        case GET_CURRENT_BOOK_FAILURE:
        case POST_BOOK_FAILURE:
        case PUT_BOOK_FAILURE:
            return {
                ...state, error: payload, isBookLoading: false
            }
        default:
            return state;
    }
};
export default bookReducer;