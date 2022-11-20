import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../redux/containers/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
