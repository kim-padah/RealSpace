import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api/auth';
import createRequestThunk from '../../lib/createRequestThunk';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';

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
      register: action.payload,
    }),
    [LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      login: action.payload,
    }),
  },
  initialState,
);

export default auth;
