
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import itemApp from './reducers/reducer.js';
import thunk from 'redux-thunk';
import { loadItems } from './actions/actions'
import logger from "redux-logger";

const store = createStore(
    itemApp,
    window.STATE_FROM_SERVER,
    composeWithDevTools(applyMiddleware(thunk)),
)

store.dispatch(loadItems());

export default store;