import axios from 'axios';
import { setAlert } from './alertAction';
import { config } from './types';

import { GET_BOOK_REQUEST, GET_BOOK_SUCCESS, GET_BOOK_FAILURE, POST_BOOK_REQUEST, POST_BOOK_SUCCESS, POST_BOOK_FAILURE, PUT_BOOK_REQUEST, PUT_BOOK_SUCCESS, PUT_BOOK_FAILURE } from './types';
import { GET_CURRENT_BOOK_REQUEST, GET_CURRENT_BOOK_SUCCESS, GET_CURRENT_BOOK_FAILURE } from './types';

//Get all book list by user
export const getAllBookByUser = () => async dispatch => {
    dispatch({ type: GET_BOOK_REQUEST })
    try {
        const res = await axios.get('/api/book/me');
        dispatch({ type: GET_BOOK_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_BOOK_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

//Get book by book ID
export const getBookById = (id) => async dispatch => {
    dispatch({ type: GET_CURRENT_BOOK_REQUEST })
    try {
        const res = await axios.get(`/api/book/${id}`, config);
        dispatch({ type: GET_CURRENT_BOOK_SUCCESS, payload: res.data });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: GET_CURRENT_BOOK_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

//Create book
export const createbook = (formData) => async dispatch => {
    dispatch({ type: POST_BOOK_REQUEST })
    try {
        const res = await axios.post('/api/book', formData, config);
        dispatch({ type: POST_BOOK_SUCCESS, payload: res.data });
        dispatch(getAllBookByUser());
        dispatch(setAlert('Book Created', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: POST_BOOK_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

//Update book
export const updatebook = (formData) => async dispatch => {
    dispatch({ type: PUT_BOOK_REQUEST })
    try {
        const res = await axios.put(`/api/book/${formData.id}`, formData, config);
        dispatch({ type: PUT_BOOK_SUCCESS, payload: res.data });
        dispatch(getAllBookByUser());
        dispatch(setAlert('Book Updated', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: PUT_BOOK_FAILURE, payload: { msg: err.response.statusText, status: err.response.status } });
    }
};

