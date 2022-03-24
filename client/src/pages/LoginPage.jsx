import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../redux/containers/LoginForm';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
