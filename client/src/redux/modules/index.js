import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import user from './user';
import write from './write';
import post from './post';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
});

export default rootReducer;
