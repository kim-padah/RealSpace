import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import user from './user';
import write from './write';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
});

export default rootReducer;
