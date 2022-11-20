import AskModal from '../common/AskModal';

const PostRemoveModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="Delete Post"
      description="Are you sure to delete?"
      confirmText="Delete"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default PostRemoveModal;
