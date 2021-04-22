import axios from 'axios';
import { setAlert } from './alertAction';
import { config } from './types';

import { GET_AUTHOR_REQUEST, GET_AUTHOR_SUCCESS, GET_AUTHOR_FAILURE, POST_AUTHOR_REQUEST, POST_AUTHOR_SUCCESS, POST_AUTHOR_FAILURE, PUT_AUTHOR_REQUEST, PUT_AUTHOR_SUCCESS, PUT_AUTHOR_FAILURE } from './types';
import { GET_CURRENT_AUTHOR_REQUEST, GET_CURRENT_AUTHOR_SUCCESS, GET_CURRENT_AUTHOR_FAILURE } from './types';

//Get all auther list by user
export const getAllAuthorByUser = () => async dispatch => {
    dispatch({ type: GET_AUTHOR_REQUEST })
    try {
        const res = await axios.get('/api/author/me');
        dispatch({ type: GET_AUTHOR_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_AUTHOR_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

//Get auther by auther ID
export const getAuthorById = (id) => async dispatch => {
    dispatch({ type: GET_CURRENT_AUTHOR_REQUEST })
    try {
        const res = await axios.get(`/api/author/${id}`, config);
        dispatch({ type: GET_CURRENT_AUTHOR_SUCCESS, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: GET_CURRENT_AUTHOR_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

//Create author
export const createAuthor = (formData) => async dispatch => {
    dispatch({ type: POST_AUTHOR_REQUEST })
    try {
        const res = await axios.post('/api/author', formData, config);
        dispatch({ type: POST_AUTHOR_SUCCESS, payload: res.data });
        dispatch(getAllAuthorByUser());
        dispatch(setAlert('Author Created', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: POST_AUTHOR_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

//Update author
export const updateAuthor = (formData) => async dispatch => {
    dispatch({ type: PUT_AUTHOR_REQUEST })
    try {
        const res = await axios.put(`/api/author/${formData.id}`, formData, config);
        dispatch({ type: PUT_AUTHOR_SUCCESS, payload: res.data });
        dispatch(getAllAuthorByUser());
        dispatch(setAlert('Author Updated', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: PUT_AUTHOR_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

