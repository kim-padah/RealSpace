import { createAction, handleActions } from 'redux-actions';

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';
// const CHANGE_INPUT = 'todos/CHANGE_INPUT';

export const sampleAction = createAction(SAMPLE_ACTION);
// export const changeInput = (input) => ({
//   type: CHANGE_INPUT,
//   input,
// });
// export const changeInput = createAction(CAHNGE_INPUT, input=>input)

const initialState = {};
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
    [SAMPLE_ACTION]: (state, action) => state,
  },
  initialState,
);

export default auth;
