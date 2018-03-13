import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as home from '../reducers/home';

let store = createStore(
  combineReducers({...home}),
  applyMiddleware(thunk)
);

export default store;
// export const history = syncHistoryWithStore(store);