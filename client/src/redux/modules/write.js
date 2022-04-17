import { createAction, handleActions } from 'redux-actions';
import createRequestThunk, {
  createRequestActionTypes,
} from '../../lib/createRequestThunk';
import * as postsAPI from '../../lib/api/posts';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST');
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createRequestActionTypes('write/UPDATE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = createRequestThunk(WRITE_POST, postsAPI.writePost);
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);
export const updatePost = createRequestThunk(UPDATE_POST, postsAPI.updatePost);

const initialState = {
  title: '',
  body: '',
  // thumbnail: '',
  tags: [],
  // images: [],
  post: null,
  postError: null,
  originalPostId: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post._id,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
);

export default write;
