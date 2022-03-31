import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch();
  // const { form } = useSelector(({ auth }) => ({
  //   form: auth.register,
  // }));
  const { form, auth, authError } = useSelector((state) => ({
    form: state.auth.register,
    auth: state.auth.auth,
    authError: state.auth.authError,
  }));
  const loadingRegister = useSelector((state) => state.loading['auth/REGISTER']);
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, nickname, adminCode } = form;
    if (password !== passwordConfirm) {
      console.log({ message: 'password confirm is not matched to password' });
      //TODO:오류 처리
      return;
    }
    dispatch(register({ username, password, nickname, adminCode }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류발생');
      console.log(authError);
      if (authError.response.data.details) {
        console.log(authError.response.data.details[0]);
      } else {
        console.log(authError.response.data);
      }
      return;
    }
    if (auth) {
      console.log('회원가입성공');
      console.log(auth);
    }
  }, [auth, authError]);

  return (
    <AuthForm
      type="register"
      form={form}
      loadingRegister={loadingRegister}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
