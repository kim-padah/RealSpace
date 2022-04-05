import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const { user } = useSelector((state) => ({
    user: state.user.user,
  }));
  return <Header user={user} />;
};

export default HeaderContainer;
