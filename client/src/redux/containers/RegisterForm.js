import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch();
  // const { form } = useSelector(({ auth }) => ({
  //   form: auth.register,
  // }));
  const form = useSelector((state) => state.auth.register);
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
      console.log('wrong password g');
      //TODO:오류 처리
      return;
    }
    dispatch(register({ username, password, nickname, adminCode }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

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
