import { REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE } from '../actions/types';

const initailState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isAuthLoading: false,
    user: null,
    all_users: [],
    isGetAllUserLoading: false
}
const authReducer = (state = initailState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state, isAuthenticated: true, isAuthLoading: false, user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state, ...payload, isAuthenticated: true, isAuthLoading: false
            }
        case REGISTER_FAILURE:
        case AUTH_ERROR:
        case LOGIN_FAILURE:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state, token: null, isAuthenticated: false, isAuthLoading: false
            }
        case GET_ALL_USERS_REQUEST:
            return {
                ...state, isGetAllUserLoading: true
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state, isGetAllUserLoading: false, all_users: payload
            }
        case GET_ALL_USERS_FAILURE:
            return {
                ...state, error: payload, isGetAllUserLoading: false
            }
        default:
            return state;
    }
};
export default authReducer;