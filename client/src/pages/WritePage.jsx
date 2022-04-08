import EditorContainer from '../redux/containers/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import TagBoxContainer from '../redux/containers/write/TagBoxContainer';
import WriteActionButtons from '../components/write/WriteActionButtons';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtons />
    </Responsive>
  );
};

export default WritePage;
