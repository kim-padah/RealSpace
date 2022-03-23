import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, (requestType) => requestType);
export const finishLoading = createAction(FINISH_LOADING, (requestType) => requestType);

// export const startLoading1 = requestType => ({
//     type:START_LOADING,
//     requestType
// })

// export const finishLoading1 = requestType => ({
//     type:FINISH_LOADING,
//     requestType
// })

const initialState = {};

// function loading(state = initialState, action) {
//     switch (action.type) {
//         case START_LOADING:
//             return {
//                 ...state,
//                 requestType: action.requestType
//             }
//         case FINISH_LOADING:
//     }
// }

const loading = handleActions({
  [START_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: true,
  }),
  [FINISH_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: true,
  }),
  initialState,
});

export default loading;
