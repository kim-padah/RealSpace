import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost } from '../modules/post';
import { setOriginalPost } from '../modules/write';
// import { removePost } from '../lib/api/posts';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';

const PostViewerContainer = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector((state) => {
    return {
      post: state.post.post,
      error: state.post.error,
      loading: state.loading['post/READ_POST'],
      user: state.user.user,
    };
  });

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={ownPost && <PostActionButtons onEdit={onEdit} />}
    />
  );
};

export default PostViewerContainer;
