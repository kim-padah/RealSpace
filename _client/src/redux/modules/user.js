import { createAction, handleActions } from 'redux-actions';
import * as authAPI from '../../lib/api/auth';
import createRequestThunk, {
  createRequestActionTypes,
} from '../../lib/createRequestThunk';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침 이후 임시 로그인 처리
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createRequestThunk(CHECK, authAPI.check);
export const logout = createAction(LOGOUT);

const resetLocalStorage = () => {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
};

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => {
      resetLocalStorage();
      return {
        ...state,
        user: null,
        checkError: error,
      };
    },
    [LOGOUT]: (state) => {
      resetLocalStorage();
      return {
        ...state,
        user: null,
      };
    },
  },
  initialState,
);
