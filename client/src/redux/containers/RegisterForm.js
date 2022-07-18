import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../modules/auth';
// import { check } from '../modules/user';
import AuthForm from '../../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector((state) => ({
    form: state.auth.register,
    auth: state.auth.auth,
    authError: state.auth.authError,
    // user: state.user.user,
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
    const { username, password, passwordConfirm, email, adminCode } = form;

    if ([username, password, passwordConfirm, email].includes('')) {
      setError('please fill the blank');
      return;
    }
    if (password !== passwordConfirm) {
      setError('password confirm not matched');
      return;
    }
    dispatch(register({ username, password, email, adminCode }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError(authError.response.data.message);
        return;
      }
      if (authError) {
        if (authError.response.data.errors.length) {
          setError(authError.response.data.errors[0].defaultMessage);
          return;
        }
        if (authError.response.data.message) {
          setError(authError.response.data.message);
          return;
        }
        setError('unknown error! please retry');
        return;
      }
      return;
    }
    if (auth) {
      alert('Welcome to join our site!');
      navigate('/login');
      // dispatch(check());
    }
  }, [auth, authError, dispatch, navigate]);

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   }
  //   try {
  //     localStorage.setItem('user', JSON.stringify(user));
  //   } catch (e) {
  //     console.log('localStorage is not working');
  //   }
  // }, [user, navigate]);

  return (
    <AuthForm
      type="register"
      form={form}
      loadingRegister={loadingRegister}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
