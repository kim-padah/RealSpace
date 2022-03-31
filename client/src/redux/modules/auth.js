import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as authAPI from '../../lib/api/auth';
import createRequestThunk from '../../lib/createRequestThunk';
import { createRequestActionTypes } from '../../lib/createRequestThunk';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');
// const REGISTER = 'auth/REGISTER';
// const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
// const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
// const LOGIN = 'auth/LOGIN';
// const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
// const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const register = createRequestThunk(REGISTER, authAPI.register);
export const login = createRequestThunk(LOGIN, authAPI.login);

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    adminCode: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draftState) => {
        draftState[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),
    // [REGISTER_SUCCESS]: (state, action) => ({
    //   ...state,
    //   register: action.payload,
    //   authError: null,
    // }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      // register: action.payload,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      // register: action.payload,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      authError: null,
      auth: action.payload,
    }),
  },
  initialState,
);

export default auth;
