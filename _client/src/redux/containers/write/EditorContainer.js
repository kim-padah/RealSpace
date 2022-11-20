import { useEffect, useCallback } from 'react';
import Editor from '../../../components/write/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector((state) => {
    return {
      title: state.write.title,
      body: state.write.body,
      // images: state.write.images,
      // thumbnail: state.write.thumbnail,
    };
  });
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  //initialize unmount
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
