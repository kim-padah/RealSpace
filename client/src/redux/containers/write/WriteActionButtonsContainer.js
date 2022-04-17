import React, { useEffect } from 'react';
import WriteActionButtons from '../../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    (state) => ({
      title: state.write.title,
      body: state.write.body,
      tags: state.write.tags,
      post: state.write.post,
      postError: state.write.postError,
      originalPostId: state.write.originalPostId,
    }),
  );

  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, tags, id: originalPostId }));
      return;
    }
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
  };

  const onCancel = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      navigate(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
      //handling in case of undefined
    />
  );
};

export default WriteActionButtonsContainer;
