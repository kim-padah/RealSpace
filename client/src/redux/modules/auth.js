import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api/auth';
import createRequestThunk from '../../lib/createRequestThunk';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const register = createRequestThunk(REGISTER, api.register);
export const login = createRequestThunk(LOGIN, api.login);

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
    }),
    [REGISTER_SUCCESS]: (state, action) => ({
      ...state,
    }),
  },
  initialState,
);

export default auth;
