import thunk from "redux-thunk";
import {createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { admin } from '../reducers/AdminReducers';
import { users } from "../reducers/UserReducers";
const combinesStore = combineReducers({
    admin,
    users
});

const store = createStore(
    combinesStore,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
   
);
export default store;