import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import bookReducer from './bookReducer';
import authorReducer from './authorReducer';

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    book: bookReducer,
    author: authorReducer
});
export default rootReducer;