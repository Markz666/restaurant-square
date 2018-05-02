/* eslint-disable */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './AuthReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form
});

export default rootReducer;