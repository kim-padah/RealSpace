import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth.login,
  }));
  const loading = useSelector(state.loading);
  // const state = useSelector(({ state.loading }) => ({}))
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      return dispatch(
        changeField({
          form: 'login',
          key: name,
          value,
        }),
      );
    },
    [dispatch],
  );
  // const onChange = (e) => {
  //   const { value, name } = e.target;
  //   dispatch(
  //     changeField({
  //       form: 'login',
  //       key: name,
  //       value,
  //     }),
  //   );
  // };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  return <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} />;
};

export default LoginForm;
