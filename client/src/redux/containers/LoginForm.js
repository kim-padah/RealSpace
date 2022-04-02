import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { form } = useSelector(({ auth }) => ({
  //   form: auth.login,
  // }));
  const { form, auth, authError, user } = useSelector((state) => ({
    form: state.auth.login,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
  }));
  const loadingLogin = useSelector((state) => state.loading['auth/LOGIN']);
  // const loading = useSelector(state.loading);
  // const state = useSelector(({ state.loading }) => ({}))
  // const onChange = useCallback(
  //   (e) => {
  //     const { value, name } = e.target;
  //     return dispatch(
  //       changeField({
  //         form: 'login',
  //         key: name,
  //         value,
  //       }),
  //     );
  //   },
  //   [dispatch],
  // );
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError(authError.response.data.message);
      return;
    }
    if (auth) {
      console.log('Login succcess');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      loadingLogin={loadingLogin}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
