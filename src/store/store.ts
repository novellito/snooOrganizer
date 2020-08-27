import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import counter from '../reducers/counter';
import user from '../reducers/user';
import login from '../reducers/login';

export const rootReducer = combineReducers({
  counter,
  login,
  user
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;