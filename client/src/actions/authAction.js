import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE } from './types';
import { setAlert } from './alertAction';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

//Get All Users
export const getAllUsers = () => async dispatch => {
    dispatch({ type: GET_ALL_USERS_REQUEST })
    try {
        const res = await axios.get('/api/users');
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_ALL_USERS_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};


//Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: REGISTER_FAILURE });
    }
}

//Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: LOGIN_FAILURE });
    }
}

//Logout /Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};