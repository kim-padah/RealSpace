import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import user from './user';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
});

export default rootReducer;
