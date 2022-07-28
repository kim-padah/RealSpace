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
  const { username, password, passwordConfirm, email, adminCode } = form;

  const onSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(error).length === 0)
      dispatch(register({ username, password, email, adminCode }));
  };

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if ([username, password, passwordConfirm, email].includes('')) {
      setError('please fill the blank');
      return;
    }
    if (username.length < 3) {
      setError('Username must be more than 3 characters');
      return;
    } else {
      setError('');
    }
    if (password.length < 4) {
      setError('Password must be more than 4 characters');
      return;
    }
    if (password !== passwordConfirm) {
      setError('password confirm not matched');
      return;
    }
    if (!regex.test(email)) {
      setError('Invalid email format');
      return;
    }
  }, [username, password, passwordConfirm, email]);

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError(authError.response.data.message);
        return;
      }
      if (authError.response.status === 400) {
        setError(authError.response.data.message);
        return;
      }
      setError('unknown error! please retry');
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
