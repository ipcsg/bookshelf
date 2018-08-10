//import combineReducers for combining reducers
import { combineReducers } from 'redux';

//import reducers for combining
import books from './books_reducer';
import user from './user_reducer';
//combine the reducers
const rootReducer = combineReducers({
    books,
    user
});

export default rootReducer;