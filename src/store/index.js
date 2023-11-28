import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import Reducers from "./reducers";
const RootReducers = combineReducers({
  Reducers,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));