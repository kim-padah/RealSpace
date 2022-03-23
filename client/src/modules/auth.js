import { createAction, handleActions } from 'redux-actions';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
// const CHANGE_INPUT = 'todos/CHANGE_INPUT';

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value,
}));
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

// export const sampleAction = createAction(SAMPLE_ACTION);
// export const changeInput = (input) => ({
//   type: CHANGE_INPUT,
//   input,
// });
// export const changeInput = createAction(CAHNGE_INPUT, input=>input)

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
};
// const initialState = {
//     input: '',
//     todos: [
//         {
//             id: 1,
//             text: 'redux basic',
//             done:true
//         }
//     ]
// }

// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input,
//       };
//   }
// }

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, {payload: {form, key, value}}
    ) => {...state,
    if([form] = "register") {
      [key]
    }
    [form][key] = value
  }  



}
)
  



// const auth = handleActions(
//   {
//     [SAMPLE_ACTION]: (state, action) => state,
//   },
//   initialState,
// );

export default auth;
