import EditorContainer from '../redux/containers/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import TagBoxContainer from '../redux/containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../redux/containers/write/WriteActionButtonsContainer';

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
