import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import classes from './auth.module.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/map' />;
  }

  return (
    <div className={classes.formWrapper}>
      <div className={classes.loginFormContainer}>
        <form onSubmit={onLogin}>
          <span className={classes.formTitle}>Login to your account</span>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className={classes.error}>{error}</div>
              ))}
          </div>
          <div className={classes.inputRow}>
            <input
              className={classes.inputField}
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            <span>*</span>
          </div>
          <div className={classes.inputRow}>
            <input
              className={classes.inputField}
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <span>*</span>
          </div>
          <button type='submit' className={classes.formButton}>Login</button>
          <span className={classes.haveAccount}>
            <NavLink to='/sign-up'>
              Don't have an account? Sign up
            </NavLink>
          </span>
        </form>
        <img className={classes.gridTop} src='/static/grid.svg' alt='grid' width={'400px'}/>
        <img className={classes.gridBottom} src='/static/grid.svg' alt='grid' width={'400px'}/>
      </div>
    </div>
  );
};

export default LoginForm;
